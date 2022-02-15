$(document).ready(function() {
  const $target = $('#target');
  const targetSize = $target.outerWidth();
  const dogTop = document.getElementById('dog').offsetTop
  const catTop = document.getElementById('cat').offsetTop
  const catLeft = document.getElementById('cat').offsetLeft

  function moveTarget() {
    // Move the model target to where we predict the user is looking to
    if (training.currentModel == null || training.inTraining) {
      return;
    }

    training.getPrediction().then(prediction => {
      const left = prediction[0] * ($('body').width() - targetSize);
      const top = prediction[1] * ($('body').height() - targetSize);

      $target.css('left', left + 'px');
      $target.css('top', top + 'px');

      
      if (top > dogTop && left < dogTop + 200 && left < 200) {
        document.getElementById('dogGood').classList.remove('show')
        document.getElementById('dogBad').classList.add('show')
        document.getElementById('dogBad').play()
      }
      if (top > catTop && left > catLeft) {
        document.getElementById('catGood').classList.remove('show')
        document.getElementById('catBad').classList.add('show')
        
      }
      document.getElementById('dataPoints').innerHTML += `User looking at ${left},${top} \n`

    });
  }

  setInterval(moveTarget, 100);

  function download(content, fileName, contentType) {
    const a = document.createElement('a');
    const file = new Blob([content], {
      type: contentType,
    });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  // Map functions to keys and buttons:

  $('body').keyup(function(e) {
    // On space key:
    if (e.keyCode === 32 && ui.readyToCollect) {
      dataset.captureExample();

      e.preventDefault();
      return false;
    }
  });

  $('#start-training').click(function(e) {
    training.fitModel();
  });

  $('#reset-model').click(function(e) {
    training.resetModel();
  });

  $('#draw-heatmap').click(function(e) {
    heatmap.drawHeatmap(dataset, training.currentModel);
  });

  $('#clear-heatmap').click(function(e) {
    heatmap.clearHeatmap();
  });

  $('#store-data').click(function(e) {
    const data = dataset.toJSON();
    const json = JSON.stringify(data);
    download(json, 'dataset.json', 'text/plain');
  });

  $('#show-data').click(function(e) {
    $('#dataPoints').addClass('show');
  });

  $('#hideAll').click(function() {
    $('#dogBad').removeClass('show')
    $('#hideAll').removeClass('show')
  })
  $('#data-uploader').change(function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
      const data = reader.result;
      const json = JSON.parse(data);
      dataset.fromJSON(json);
    };

    reader.readAsBinaryString(file);
  });

  $('#store-model').click(async function(e) {
    await training.currentModel.save('downloads://model');
  });

  $('#load-model').click(function(e) {
    $('#model-uploader').trigger('click');
  });

  $('#model-uploader').change(async function(e) {
    const files = e.target.files;
    training.currentModel = await tf.loadLayersModel(
      tf.io.browserFiles([files[0], files[1]]),
    );
    ui.onFinishTraining();
  });
});
