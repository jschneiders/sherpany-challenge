$(document).ready(function(){
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
        $('#agendaItemSelect').append("<option value='"+index+"'>"+agendaItems[el].name+"</option>");
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
    });

    $('#browseFromComputer').click(function(){
        $('#file').trigger('click');
    });
    var filesCounter = 0;
    $('#addFile').click(function(){
        if(droppedFiles){
            itemToAddFile = $('#agendaItemSelect').val() - 1;
            for(var i = 0; i < droppedFiles.length; i++ ){
                $('#showFiles').append('<p>'+droppedFiles[i].name+'</p>');
                agendaItems[itemToAddFile].files.push(droppedFiles[i]);
                filesCounter += 1;
            }            
            droppedFiles = false;
            if($('#file').val()){
                fileName = $('#file').val().split('\\');
                 $('#showFiles').append('<p>'+fileName[2]+'</p>');
                agendaItems[itemToAddFile].files.push(fileName[2]);
                filesCounter += 1;
                $('#file').val('');
            }
        }else{
            if($('#file').val()){
                itemToAddFile = $('#agendaItemSelect').val() - 1;
                fileName = $('#file').val().split('\\');
                 $('#showFiles').append('<p>'+fileName[2]+'</p>');
                agendaItems[itemToAddFile].files.push(fileName[2]);
                filesCounter += 1;
                $('#file').val('');
            }
        }

        
        $('#filesCounter').html(filesCounter);
    });

    $('#closeFileCard').click(function(){
        $('.fileCard').animate({
            bottom: "64"
        },300, function(){
            $(this).hide();
        });
        $('.insideFileCard').animate({
            top: "29"
        },300, function(){
            $(this).hide();
        });
        isFileCardOpen = false;
    });

    $('#publishButton').click(function(){
        $('#publishCard').fadeIn('slow');
    });

    $('#closePublishCard').click(function(){
        $('#publishCard').hide();
    });

    //control the card for files
    isFileCardOpen = false;
    $('#addDocument').click(function(){
        if(isFileCardOpen){
            $('.fileCard').animate({
                bottom: "64"
            },300, function(){
                $(this).hide();
            });
            $('.insideFileCard').animate({
                top: "29"
            },300, function(){
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
            name = name.charAt(0).toUpperCase() + name.slice(1);
            $("<li><span>"+index+"</span><span>"+name+"</span></li>").insertBefore(lastLi);
            $('#agendaItemSelect').append("<option value='"+index+"'>"+name+"</option>");
            agendaItems[index] = {name: name,  files: []};
            index += 1;
            $('#newItemIndex').text(index);
            $(this).val('Enter a new agenda item...');
        }
    });
});



