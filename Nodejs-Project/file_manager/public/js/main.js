$(document).ready(function(){
    $('#myTab li').each(function(){
        $(this)[0].querySelector('a').addEventListener('click',function(){
           $('#selected_folder').val(this.innerHTML)
           $('#selected_private_folder').val(this.innerHTML)
           $('#selected_cetegory').val(this.innerHTML)
        })
    })
})

function PrivateFolder(parentFolderId){
   $('#ParentFolder').val(parentFolderId)
}

//upload file/Document
function uploadFile(folderName,folderId){
     $('#folder_path').val(folderName)
     $('#folder_id').val(folderId)
}