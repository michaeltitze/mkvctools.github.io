
  
  function downloadJSON() {
    var data = document.getElementById("output").innerHTML;
    var file = new Blob([data], {type: "application/json"});
    var a = document.createElement("a");
    var url = URL.createObjectURL(file);
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  
 