
  
  function PrivateFolder(cateId,fileId){
     $('#ParentFolder').val(fileId)
     $('#selected_private_folder').val(cateId)
  }
  
  //upload file/Document
  function uploadFile(folderName,folderId){
       $('#folder_path').val(folderName)
       $('#folder_id').val(folderId)
  }

  function viewFile(fileId){
      fetch("/view/"+fileId).then(response => {
   
            if (!response.ok) {
                  throw new Error('Network response was not ok');
            }
    
            return response.text();
      }).then(data => {
            $('#editor').html(`<div class="form-group">
            <textarea class="form-control" id="txt" rows="20">${data}</textarea>
            </div>
            <button onclick="saveFile(${fileId})" class="btn btn-primary">Save</button>
            `)

      })
  }

  function saveFile(fileId){
      var data = $('#txt').val();
      $.ajax({
            type: 'POST',
            url: '/save/'+fileId, 
            contentType: 'application/json', 
            data: JSON.stringify({ data: data }), 
            success: function(response) {
                console.log('File has been written successfully:', response);
            },
            error: function(xhr, status, error) {
                console.error('Error writing file:', error);
            }
      });
  }

  function toggle(ele,folder){
      $(`.childFile${folder}`).toggleClass("hidden");
      $(`.childDocs${folder}`).toggleClass("hidden");
      if($(`.childDocs${folder}`).hasClass("hidden") || $(`.childFile${folder}`).hasClass("hidden")){
        $(ele).addClass('fa-chevron-up')
        $(ele).removeClass('fa-chevron-down')
      }else{
        $(ele).addClass('fa-chevron-down')
        $(ele).removeClass('fa-chevron-up')
      }
  }

 /*  const tabs = document.querySelectorAll('.tab-link');
  tabs.forEach(tab => {
    tab.addEventListener('click', function(event) {
        event.preventDefault();
        const tabId = this.getAttribute('href').substring(1);
        showTab(tabId);
        history.pushState({}, '', '#' + tabId);
    });
  });
const tabContents = document.querySelectorAll('.tab-content');
function showTab(tabId) {
  tabContents.forEach(tabContent => {
    if(tabContent.id === tabId){
      tabContent.classList.add('active');
    }else{
      tabContent.classList.remove('active');
    }
      
  });
}
function showTab(tabId) {
  tabContents.forEach(tabContent => {
    if(tabContent.id === tabId){
      tabContent.classList.add('active');
    }else{
      tabContent.classList.remove('active');
    }
      
  });
}
function selectTab(tabId) {
  
  tabs.forEach(tab => {
    const href = tab.getAttribute('href').substring(1)
    if(href === tabId){
      tab.classList.add('active');
    }else{
      tab.classList.remove('active');
    } 
  });
}


const init = 'Story'
const initialTab = window.location.hash.substring(1);
    if(initialTab) {
      showTab(initialTab)
      selectTab(initialTab)
    }else{
      showTab(init)
      selectTab(init)
    } 
*/