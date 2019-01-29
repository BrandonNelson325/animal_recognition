<style>
  form{
    display: block;
    height: 150;
    width: 900px;
    margin: auto;
    margin-top: 40px;
    text-align: center;
    line-height: 200px;
    border:1px solid #ccc;
    border-radius: 4px;
  }
</style>

<template>

  <div>
    <img src="../../logo.png" alt="Is it a cat logo">
    <br>
    <div id="file-drag-drop">
      <form ref="fileform" @click='$refs.file.click()'>
        <span class="drop-files">Drag and drop your image here! (click to select a file)</span>
      </form>
    </div>
    <input 
      @change="handleFile($event.target.files[0])"
      type="file"
      id="file"
      ref="file"
      placeholder="Choose Image"
      accept="image/*"
      style="display:none">
    <br>
    <h2>{{message}}</h2>
    <img v-if="img" :src=img style="max-height:400px;">
  </div>
</template>

<script>

import AuthenticationService from '@/services/AuthenticationService'
import FormData from 'form-data'

export default {
  name: 'Home',
  data () {
    return {
      message:'',
      file:'',
      img:'',
      drag_and_drop:false
    }
  },
  methods: {
    async upload() {
      var formData = new FormData()
      formData.append('file', this.file)
      const response = await AuthenticationService.upload(formData)

      if (response.data.cats.length) {
        this.message = 'Looks like you found a cat!'
      } else {
        this.message = 'This image doesn\'t appear to be a cat, try another!'
      }

      var image = "data:"+response.data.type+";base64," + new Buffer(response.data.img.data).toString("base64");
      this.img = image
    },
    handleFile(file) {
      this.file = this.$refs.file.files[0]
      this.upload()
    }
  },
  mounted() {
    // This will determine whether the browser can handle drag and drop or not
    var div = document.createElement('div');
    this.drag_and_drop = ( ( 'draggable' in div )
              || ( 'ondragstart' in div && 'ondrop' in div ) )
              && 'FormData' in window
              && 'FileReader' in window
    if (this.drag_and_drop) {
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop', 'change'].forEach( function( evt ) {
        this.$refs.fileform.addEventListener(evt, function(e){
          console.log('something done')
          e.preventDefault();
          e.stopPropagation();
        }.bind(this), false);
      }.bind(this));
      this.$refs.fileform.addEventListener('drop', function(e){
        if (e.dataTransfer.files.length > 1) {
          alert('We can only check one image at a time! We will check the first image!')
        }
        this.file = e.dataTransfer.files[0]
        this.upload()
      }.bind(this));
      this.$refs.fileform.addEventListener('change', function(e){
        if (e.dataTransfer.files.length > 1) {
          alert('We can only check one image at a time! We will check the first image!')
        }
        this.file = e.dataTransfer.files[0]
        console.log(this.file)
        this.upload()
      }.bind(this));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
