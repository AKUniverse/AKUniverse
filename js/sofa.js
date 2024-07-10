document.addEventListener('DOMContentLoaded', function() {
  var images = document.querySelectorAll('.image');

  images.forEach(function(image) {
    image.addEventListener('dblclick', function() {
      var imageUrl = this.getAttribute('src');
      var link = document.createElement('a');
      link.href = imageUrl;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });

  document.addEventListener('contextmenu', function(event) {
    const selectedText = window.getSelection().toString().trim();
    if (!selectedText) {
      event.preventDefault();
    }
  });
});
