function deleteUpload(obj){
    const delObj = {
        folderId:obj.folderId ?? null,
        fileId:obj.fileId ?? null,
    }
    $.ajax({
        url:"/folder/file/delete",
        type:"GET",
        data:{deleteId:delObj},
        success:function(data){
           console.log(data)
        }
    })
}