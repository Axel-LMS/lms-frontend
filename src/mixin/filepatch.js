const filepath = {
    methods: {
        image_path(path) {  
            return "http://localhost:8000/storage/"+path;
        }
    }
  }
  export default filepath;