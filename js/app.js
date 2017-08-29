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
var index = 0;
for(var el in agendaItems){ 
    index = parseInt(el, 10) + 1;
    $('#agendaTab ul').append("<li><span>"+index+"</span><span>"+agendaItems[el].name+"</span></li>");
}
index += 1;
$('#agendaTab ul').append("<li><span id='newItemIndex'>"+index+"</span><input class='addNewItem' id='addNewItem' placeholder='Enter a new agenda item...' /></li>");

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

$(document).ready(function(){
    $('#browseFromComputer').click(function(){
        $('#file').trigger('click');
    });

    //control the card for files
    isFileCardOpen = false;
    $('#addDocument').click(function(){
        if(isFileCardOpen){
            $('.fileCard').animate({
                bottom: "64"
            },400, function(){
                $(this).hide();
            });
            $('.insideFileCard').animate({
                top: "29"
            },400, function(){
                $(this).hide();
            });
            isFileCardOpen = false;
        }else{
            $('.fileCard').show().animate({
                bottom: "74"
            },300);
            $('.insideFileCard').show().animate({
                top: "19"
            },300);
            isFileCardOpen = true;
        }
    });

    //control new items add
    $('#addNewItem').keypress(function(e){
        if(e.which == 13){
            //get global index
            var name = $(this).val();
            lastLi = $(this).parent();
            $("<li><span>"+index+"</span><span>"+name+"</span></li>").insertBefore(lastLi);
            index += 1;
            $('#newItemIndex').text(index);
        }
    });
});



