// Open the modal
    function openModal() {
      document.getElementById("myModal").style.display = "flex";
    }

    // Close the modal
    function closeModal() {
      document.getElementById("myModal").style.display = "none";
    }

    function previewImage(event) {
      const fileInput = event.target;
      const preview = document.getElementById('preview');

      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        // Create a temporary URL and show the preview
        const imageUrl = URL.createObjectURL(file);
        preview.src = imageUrl;
        document.getElementById("upImg").style.display = "none";
        preview.style.display = "block";
      } else {
        imagePath.value = '';
        preview.src = '';
        preview.style.display = "none";
      }
    }

    async function uploadFile() {
      const fileInput = document.getElementById('imageUpload');
      const file = fileInput.files[0];

      if (!file) {
        alert("Please select a file to upload.");
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          document.getElementById("skin-type").style.display = "flex";
          const data = await response.json();
          const prediction_label = data.prediction.substring(2);
          document.getElementById('alert_label').value = 'Image Uploaded successfully';
          document.getElementById('alert_label').style.color = 'green';
          document.getElementById('predict_label').value = 'Prediction :'+prediction_label;
          document.getElementById("upSub").style.display = "none";
        } else {
          document.getElementById('alert_label').value = 'File upload failed.';
          document.getElementById('alert_label').style.color = 'red';
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        document.getElementById('alert_label').value = 'Error uploading file.';
        document.getElementById('alert_label').style.color = 'red';
      }
    }
    function skintype() {
      document.getElementById("myModal").style.display = "none";
      document.getElementById("skintypeModal").style.display = "flex";
      console.log(document.getElementById('predict_label').value)
      document.getElementById('predict_label_skin').value = document.getElementById('predict_label').value;
    }

//close buttons
    function closeStypeModal() {
      document.getElementById("skintypeModal").style.display = "none";
    }
    function closeNeczModal() {
      document.getElementById("report-normal-eczema").style.display = "none";
    }
    function closeDeczModal() {
      document.getElementById("report-dry-eczema").style.display = "none";
    }
    function closeOeczModal() {
      document.getElementById("report-oily-eczema").style.display = "none";
    }
    function closeCOMBeczModal() {
      document.getElementById("report-comb-eczema").style.display = "none";
    }
    function closeNenfModal() {
      document.getElementById("report-normal-enfeksiyonel").style.display = "none";
    }
    function closeDenfModal() {
      document.getElementById("report-dry-enfeksiyonel").style.display = "none";
    }
    function closeOenfModal() {
      document.getElementById("report-oily-enfeksiyonel").style.display = "none";
    }
    function closecombenfModal() {
      document.getElementById("report-combination-enfeksiyonel").style.display = "none";
    }
    function closeNbenModal() {
      document.getElementById("report-normal-benign").style.display = "none";
    }
    function closeDbenModal() {
      document.getElementById("report-dry-benign").style.display = "none";
    }
    function closeCOMBeczModal() {
      document.getElementById("report-oily-benign").style.display = "none";
    }
    function closeCombenModal() {
      document.getElementById("report-combination-benign").style.display = "none";
    }
    function closeNMalModal() {
      document.getElementById("report-normal-malign").style.display = "none";
    }
    function closeDMalModal() {
      document.getElementById("report-dry-malign").style.display = "none";
    }
    function closeOMalModal() {
      document.getElementById("report-oily-malign").style.display = "none";
    }
    function closeComMalModal() {
      document.getElementById("report-combination-malign").style.display = "none";
    }

    function skinNormal() {
        console.log(document.getElementById("predict_label_skin").value)
        if (document.getElementById("predict_label_skin").value=='Prediction : Ekzama'){
            document.getElementById("skintypeModal").style.display = "none";
            document.getElementById("report-normal-eczema").style.display = "flex";
        }
        if (document.getElementById("predict_label_skin").value=='Prediction : Benign'){
            document.getElementById("skintypeModal").style.display = "none";
            document.getElementById("report-normal-benign").style.display = "flex";
        }
        if (document.getElementById("predict_label_skin").value=='Prediction : Enfeksiyonel'){
            document.getElementById("skintypeModal").style.display = "none";
            document.getElementById("report-normal-enfeksiyonel").style.display = "flex";
        }
        if (document.getElementById("predict_label_skin").value=='Prediction : Malign'){
            document.getElementById("skintypeModal").style.display = "none";
            document.getElementById("report-normal-malign").style.display = "flex";
        }

    }
    function skinDry() {
        console.log(document.getElementById("predict_label_skin").value)
        if (document.getElementById("predict_label_skin").value=='Prediction : Ekzama'){
            document.getElementById("skintypeModal").style.display = "none";
            document.getElementById("report-dry-eczema").style.display = "flex";
        }
        if (document.getElementById("predict_label_skin").value=='Prediction : Benign'){
            document.getElementById("skintypeModal").style.display = "none";
            document.getElementById("report-dry-benign").style.display = "flex";
        }
        if (document.getElementById("predict_label_skin").value=='Prediction : Enfeksiyonel'){
            document.getElementById("skintypeModal").style.display = "none";
            document.getElementById("report-dry-enfeksiyonel").style.display = "flex";
        }
        if (document.getElementById("predict_label_skin").value=='Prediction : Malign'){
            document.getElementById("skintypeModal").style.display = "none";
            document.getElementById("report-dry-malign").style.display = "flex";
        }
    }
    function skinOily() {
        console.log(document.getElementById("predict_label_skin").value)
        if (document.getElementById("predict_label_skin").value=='Prediction : Ekzama'){
            document.getElementById("skintypeModal").style.display = "none";
            document.getElementById("report-oily-eczema").style.display = "flex";
        }
        if (document.getElementById("predict_label_skin").value=='Prediction : Benign'){
            document.getElementById("skintypeModal").style.display = "none";
            document.getElementById("report-oily-benign").style.display = "flex";
        }
        if (document.getElementById("predict_label_skin").value=='Prediction : Enfeksiyonel'){
            document.getElementById("skintypeModal").style.display = "none";
            document.getElementById("report-oily-enfeksiyonel").style.display = "flex";
        }
        if (document.getElementById("predict_label_skin").value=='Prediction : Malign'){
            document.getElementById("skintypeModal").style.display = "none";
            document.getElementById("report-oily-malign").style.display = "flex";
        }
    }
    function skinCombination() {
        console.log(document.getElementById("predict_label_skin").value)
        if (document.getElementById("predict_label_skin").value=='Prediction : Ekzama'){
            document.getElementById("skintypeModal").style.display = "none";
            document.getElementById("report-comb-eczema").style.display = "flex";
        }
        if (document.getElementById("predict_label_skin").value=='Prediction : Benign'){
            document.getElementById("skintypeModal").style.display = "none";
            document.getElementById("report-combination-benign").style.display = "flex";
        }
        if (document.getElementById("predict_label_skin").value=='Prediction : Enfeksiyonel'){
            document.getElementById("skintypeModal").style.display = "none";
            document.getElementById("report-combination-enfeksiyonel").style.display = "flex";
        }
        if (document.getElementById("predict_label_skin").value=='Prediction : Malign'){
            document.getElementById("skintypeModal").style.display = "none";
            document.getElementById("report-combination-malign").style.display = "flex";
        }
    }

    function n_ecz_treat_fun() {
        document.getElementById("n_ecz_treat").classList.toggle("show");
    }
    function n_ecz_med_fun() {
        document.getElementById("n_ecz_med").classList.toggle("show");
    }
    function n_ecz_life_fun() {
        document.getElementById("n_ecz_life").classList.toggle("show");
    }
    function d_ecz_treat_fun() {
        document.getElementById("d_ecz_treat").classList.toggle("show");
    }
    function d_ecz_med_fun() {
        document.getElementById("d_ecz_med").classList.toggle("show");
    }
    function d_ecz_life_fun() {
        document.getElementById("d_ecz_life").classList.toggle("show");
    }
    function o_ecz_treat_fun() {
        document.getElementById("o_ecz_treat").classList.toggle("show");
    }
    function o_ecz_med_fun() {
        document.getElementById("o_ecz_med").classList.toggle("show");
    }
    function o_ecz_life_fun() {
        document.getElementById("o_ecz_life").classList.toggle("show");
    }
    function comb_ecz_treat_fun() {
        document.getElementById("comb_ecz_treat").classList.toggle("show");
    }
    function comb_ecz_med_fun() {
        document.getElementById("comb_ecz_med").classList.toggle("show");
    }
    function comb_ecz_life_fun() {
        document.getElementById("comb_ecz_life").classList.toggle("show");
    }
    function n_enf_treat_fun() {
        document.getElementById("n_enf_treat").classList.toggle("show");
    }
    function n_enf_med_fun() {
        document.getElementById("n_enf_med").classList.toggle("show");
    }
    function n_enf_life_adju_fun() {
        document.getElementById("n_enf_life_adju").classList.toggle("show");
    }
    function d_enf_treat_fun() {
        document.getElementById("d_enf_treat").classList.toggle("show");
    }
    function d_enf_med_fun() {
        document.getElementById("d_enf_med").classList.toggle("show");
    }
    function d_enf_life_adju_fun() {
        document.getElementById("d_enf_life_adju").classList.toggle("show");
    }
    function o_enf_treat_fun() {
        document.getElementById("o_enf_treat").classList.toggle("show");
    }
    function o_enf_med_fun() {
        document.getElementById("o_enf_med").classList.toggle("show");
    }
    function o_enf_life_adju_fun() {
        document.getElementById("o_enf_life_adju").classList.toggle("show");
    }
    function comb_enf_treat_fun() {
        document.getElementById("comb_enf_treat").classList.toggle("show");
    }
    function comb_enf_med_fun() {
        document.getElementById("comb_enf_med").classList.toggle("show");
    }
    function comb_enf_life_adju_fun() {
        document.getElementById("comb_enf_life_adju").classList.toggle("show");
    }
    function n_ben_treat_fun() {
        document.getElementById("n_ben_treat").classList.toggle("show");
    }
    function n_ben_med_fun() {
        document.getElementById("n_ben_med").classList.toggle("show");
    }
    function n_ben_life_adju_fun() {
        document.getElementById("n_ben_life_adju").classList.toggle("show");
    }
    function d_ben_treat_fun() {
        document.getElementById("d_ben_treat").classList.toggle("show");
    }
    function d_ben_med_fun() {
        document.getElementById("d_ben_med").classList.toggle("show");
    }
    function d_ben_life_adju_fun() {
        document.getElementById("d_ben_life_adju").classList.toggle("show");
    }
    function o_ben_treat_fun() {
        document.getElementById("o_ben_treat").classList.toggle("show");
    }
    function o_ben_med_fun() {
        document.getElementById("o_ben_med").classList.toggle("show");
    }
    function o_ben_life_adju_fun() {
        document.getElementById("o_ben_life_adju").classList.toggle("show");
    }
    function n_mal_treat_fun() {
        document.getElementById("n_mal_treat").classList.toggle("show");
    }
    function n_mal_med_fun() {
        document.getElementById("n_mal_med").classList.toggle("show");
    }
    function n_mal_life_adju_fun() {
        document.getElementById("n_mal_life_adju").classList.toggle("show");
    }
    function d_mal_treat_fun() {
        document.getElementById("d_mal_treat").classList.toggle("show");
    }
    function d_mal_med_fun() {
        document.getElementById("d_mal_med").classList.toggle("show");
    }
    function d_mal_life_adju_fun() {
        document.getElementById("d_mal_life_adju").classList.toggle("show");
    }
    function o_mal_treat_fun() {
        document.getElementById("o_mal_treat").classList.toggle("show");
    }
    function o_mal_med_fun() {
        document.getElementById("o_mal_med").classList.toggle("show");
    }
    function o_mal_life_adju_fun() {
        document.getElementById("o_mal_life_adju").classList.toggle("show");
    }
    function com_mal_treat_fun() {
        document.getElementById("com_mal_treat").classList.toggle("show");
    }
    function com_mal_med_fun() {
        document.getElementById("com_mal_med").classList.toggle("show");
    }
    function com_mal_life_adju_fun() {
        document.getElementById("com_mal_life_adju").classList.toggle("show");
    }



