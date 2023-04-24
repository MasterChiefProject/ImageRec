const fileInput = document.getElementById("file-input");
document
  .getElementById("myButton")
  .addEventListener("click", function () {
    uploadFile(fileInput.files[0]);
  });

function uploadFile(file) {
  posted_file =
    "https://objectstorage.il-jerusalem-1.oraclecloud.com/p/d1TxHfw9Eq5kdqWZ2c1SF4caDQCZ_jsOeuPkf1thrFshqVvHIY1XVcVfMfHgFimR/n/ax4h8cwdkxa7/b/Ai-Images/o/asd123.png";
  fetch(posted_file, {
    method: "PUT",
    headers: {
      "Content-Type": "image/png",
    },
    body: file,
  });
}


const fileStatus = document.getElementById("file-input");

function fileStatus() {
  fileStatus = "127.0.0.1:5000/modelResponse"
  fetch(posted_file, {
    method: "PUT",
    headers: {
      "Content-Type": "image/png",
    },
    body: file,
  });


}
