//set some agenda items for demonstration
var agendaItems = {
    0: {name: 'Admin',
      files: []}, 
    1: {name: 'Minutes Last Meeting',
      files: []}, 
    2: {name: 'Performance',
      files: []}, 
    3: {name: 'Management Update',
      files: []},       
};
//put the items into the view
for(var el in agendaItems){
    $('#agendaTab ul').append("<li><span>"+el+"</span><span>"+agendaItems[el].name+"</span></li>");
}

$form = $('#form');
var droppedFiles = false;
//listen for the drag file
$form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
    e.preventDefault();
    e.stopPropagation();    
})
.on('drop', function(e) {
    droppedFiles = e.originalEvent.dataTransfer.files;
    console.log(droppedFiles);
});



