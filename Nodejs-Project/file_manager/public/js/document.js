let check = []
function selectedFolder(folderId,categories,tabId=null){
    $('#file_container').empty()
    if(check.includes(folderId)){
         const index = check.indexOf(folderId)
         $(`.drop${folderId}`).addClass('hideChild')
         $(`#folder_${folderId}`).addClass('fa-chevron-down')
         $(`#folder_${folderId}`).removeClass('fa-chevron-up')
         if(index !== -1){
             check.splice(index,1)
         }
        selectTabFolder({id:tabId,name:categories})
    }else{
        check.push(folderId)
        $(`.drop${folderId}`).removeClass('hideChild')
        $(`#folder_${folderId}`).removeClass('fa-chevron-down')
        $(`#folder_${folderId}`).addClass('fa-chevron-up')
        $.ajax({
            url:"/folder/files",
            type:"GET",
            data:{folderId:folderId},
            success:function(data){
              var {inside} = data         
              inside.forEach(ele => {
                $('#file_container').append(`
                    <div class="file-box">
                        <div class="file">
                            <div>
                                <span class="corner"></span>
                                <div class="icon">`+
                                    (ele.type == 'file' ? '<i class="img-responsive fa fa-film"></i>' : '<i class="bi bi-folder-fill"></i>')
                                +`</div>
                                <div class="file-name text-center d-flex justify-content-center g-2">
                                  <div>
                                    `+
                                    (ele.type == 'file' ? ele.name : ele.folder_name)
                                    +`
                                    <div>
                                        <span><i class="bi bi-eye-fill px-2"></i></span>
                                        <span><i class="bi bi-pencil-square px-2"></i></span>
                                        <span><i class="bi bi-trash-fill px-2" onclick="deleteUpload({`+(ele.type == 'file' ? 'fileId' : 'folderId') +`:${ele.id}})"></i></span>
                                    </div>
                                  </div>  
                                </div>
                            </div>
                        </div>
                    </div>
               `)
             });
           
            }
        })
    }
}
//tab selected 
function selectFolder(object){
    $('#file_container').empty()
    $.ajax({
        url:"/folder/directory",
        type:"GET",
        data:{dir:object},
        success:function(data){
         var {dir} = data
         dir.forEach(ele => {
            $('#file_container').append(`
                <div class="file-box">
                    <div class="file">
                        <div>
                            <span class="corner"></span>
                            <div class="icon">
                               <i class="bi bi-folder-fill"></i>
                            </div>
                            <div class="file-name text-center d-flex justify-content-center g-2">
                               <div>
                               ${ele.folder_name}
                                <div>
                                    <span><i class="bi bi-eye-fill px-2"></i></span>
                                    <span><i class="bi bi-pencil-square px-2"></i></span>
                                    <span><i class="bi bi-trash-fill px-2" onclick="deleteUpload({'folderId':${ele.id}})"></i></span>
                                </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
           `)
         });
       
        }
    })
}
// //tab folder select
function selectTabFolder(object){
    $('#file_container').empty()
    $.ajax({
        url:"/tab/folder",
        type:"GET",
        data:{dir:object},
        success:function(data){
         var {dir} = data
         dir.forEach(ele => {
            if(ele.parent_id == object.id || ele.file_id == object.id){
                $('#file_container').append(`
                    <div class="file-box">
                        <div class="file">
                            <div>
                                <span class="corner"></span>
                                <div class="icon">`+
                                   (ele.type == 'file' ? '<i class="img-responsive fa fa-film"></i>' : '<i class="bi bi-folder-fill"></i>')
                                +`</div>
                                <div class="file-name text-center d-flex justify-content-center g-2">
                                  <div>
                                    `+
                                    (ele.type == 'file' ? ele.name : ele.folder_name)
                                    +`
                                    <div>
                                        <span><i class="bi bi-eye-fill px-2"></i></span>
                                        <span><i class="bi bi-pencil-square px-2"></i></span>
                                        <span><i class="bi bi-trash-fill px-2"  onclick="deleteUpload({`+(ele.type == 'file' ? 'fileId' : 'folderId') +`:${ele.id}})"></i></span>
                                    </div>
                                  </div>  
                                </div>
                            </div>
                        </div>
                    </div>
               `)
            }
           
         });
       
        }
    })
}