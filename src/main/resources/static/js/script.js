"use strict";
$(document).ready(function() {
    function changeIndex() {
        var r_f = $('.r_f') ? $('.r_f').find('.required__photos_wrapper'): null;
        var o_f = $('.o_f') ? $('.o_f').find('.required__photos_wrapper'): null;
        var d_f = $('.d_f') ? $('.d_f').find('.required__photos_wrapper'): null;

        if (o_f) {
            if (r_f && !r_f.length && o_f.length){
                var e = o_f.eq(0);
                o_f.eq(0).remove();
                $('.r_f').append(e);
            }
            o_f = $('.o_f').find('.required__photos_wrapper');
            if (o_f.length > 4) {
                for (var i = o_f.length-1; i >= 0; i--){
                    if (i > 3) {
                        var el = o_f.eq(i);
                        o_f.eq(i).remove();
                        $('.d_f').prepend(el);
                    }
                }
            } else if(d_f && o_f.length < 4) {
                var k = o_f.length;
                for (var i =0; i < d_f.length; i++){
                    k++;
                    if (k<=4) {
                        var el = d_f.eq(i);
                        d_f.eq(i).remove();
                        $('.o_f').append(el);
                    }
                }
            }
        }
    }

    $('.modeernation__wrapper').submit(function (e) {
        e.preventDefault();
        var images = $(this).find('.photo-src');
        var save_data = [];
        for(var i = 0;i<images.length;i++){
            save_data.push({
                key: i+1,
                value: $(images.eq(i)).attr('src').split('/')[2].split('.')[0]
            });
        }
        var self = this;
        $.ajax({
            url: '/dragDrop',
            type: "POST",
            dataType : 'json',
            contentType : "application/json",
            data:  JSON.stringify(save_data) ,
            complete: function(t, status) {
                if(t.status === 200) {
                    var images = $(self).find('.photo-src');
                    setTimeout(function () {
                        for(var i = 0;i<images.length;i++){
                            var j = i+1;
                            if (j != $(images.eq(i)).attr('src').split('/')[2].split('.')[0]) {
                                var filename = $(images.eq(i)).attr('src').split('/')[2].split('.')[1];
                                var src = '/files/' + j + '.' + filename.split('p=')[0] + "p=" + makeid(7);
                                $(images.eq(i)).attr('src', src);
                                $(images.eq(i)).next().next().find('.required__photo_menu--item-show').attr('href', src);
                            }

                        }

                        changeIndex();
                    },1000)

                }
            }
        })
    });

    $(document).on('click', '.required__photo_menu--item-delete', function() {
        var res = confirm("Do you want to delete?");
        if(res) {
            var file_href = $(this).parent().find('.required__photo_menu--item-show').attr('href');
            var file_num = file_href.split('/files/')[1].split('.png?')[0];
            var self = this;
            $.ajax({
                url: '/deleteItem/' + file_num,
                type: "DELETE",
                complete: function (t, status) {
                    if (t.status === 200) {
                        $(self).parents('.required__photos_wrapper').remove();
                        changeIndex();
                        for (var i = file_num - 1; i < $('.required__photos_wrapper').length; i++) {
                            var el = $('.required__photos_wrapper').eq(i).find('img');
                            var filename = el.attr('src').split('/')[2].split('.')[1];
                            var src = '/files/' + (i + 1) + '.' + filename.split('p=')[0] + "p=" + makeid(7);
                            el.attr('src', src);
                            el.next().next().find('.required__photo_menu--item-show').attr('href', src);
                        }
                    }
                }
            });
        }
    });

    $(document).on('click', '.required__photo_menu--item-load', function(){
        var el = $(this).parents('.required__photos_wrapper').find('img');
        var res = confirm("Do you want to download?");
        if(res){
            var link = document.createElement('a');
            link.setAttribute('href', el.attr('src').split('?p')[0]);
            link.setAttribute('download', 'download.png');
            link.setAttribute('target', '_blank');
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });
    var changedImg;

    $(document).on('click', '.required__photo_menu--item-change', function(){
        changedImg = $(this).parents('.required__photos_wrapper').find('img');
        $('#upload-file').click();
    });

    $('#upload-file').change(function () {
        var formData = new FormData();
        formData.append('index', changedImg.attr('src').split('?p')[0].split('.')[0].split('/files/')[1]);
        formData.append('file', document.getElementById('upload-file').files[0]);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/uploadImage', true);
        xhr.onload = function () {
            var src = changedImg.attr('src').split('?p=')[0] + "?p=" + makeid(7);
            changedImg.attr('src', src);
            changedImg.next().next().find('.required__photo_menu--item-show').attr('href', src);
        };
        xhr.onerror = function () {
            alert("error")
        };
        xhr.send(formData);
    });

    $('#upload-file-multiple').change(function () {
        var files = document.getElementById('upload-file-multiple').files;
        if (files.length != $('.checkboxinpt:checked').length){
            alert("nsheq enqan inchqan nsheleq")
        }else{
            var index = '';
            $('.checkboxinpt:checked').each( function( I, element ){

                index += (I ? ',' : '') + $(element).parents('.required__photos_wrapper')
                        .find('img').attr('src').split('?p')[0].split('/files/')[1];

            });
            var form = document.getElementById("myForm");
            var formData = new FormData(form);
            formData.append('index', index);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', "/uploadImages");
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    $('.required__photos_wrapper').each( function( index, element ){
                        var el = $(element).find('img');
                        var filename = el.attr('src').split('/')[2].split('.')[1];
                        var src = '/files/' + (index +1) + '.' + filename.split('p=')[0] + "p=" + makeid(7);
                        el.attr('src', src);
                        el.next().next().find('.required__photo_menu--item-show').attr('href', src);
                    });
                }
            }
            xhr.send(formData);
        }
    });

    $(document).on('click', '.photoe__selct_item--load', function(){
        if($('.checkboxinpt:checked').length){
            var res = confirm("Do you want to download?");
            if(res) {
                for (var i = 0; i < $('.checkboxinpt:checked').length; i++) {
                    var link = document.createElement('a');
                    link.setAttribute('href', $('.checkboxinpt:checked').eq(i).parents('.required__photos_wrapper').find('img').attr('src').split('?p')[0]);
                    link.setAttribute('download', 'download.png');
                    link.setAttribute('target', '_blank');
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        }else{
            alert("please select a file")
        }
    });

    $(document).on('click', '.photoe__selct_item--change', function(){
        if($('.checkboxinpt:checked').length){
            $('#upload-file-multiple').click();
        }else{
            alert("please select a item")
        }
    });

    $(document).on('click', '.photoe__selct_item--delete', function(){
        if($('.checkboxinpt:checked').length){
            var res = confirm("Do you want to delete?");
            if(res) {
                var filename = []
                for (var i = 0; i < $('.checkboxinpt:checked').length; i++) {
                    var imgname = $('.checkboxinpt:checked').eq(i).parents('.required__photos_wrapper')
                        .find('img').attr('src').split('?p')[0].split('/files/')[1];
                    filename.push({name: imgname});
                }

                var self = this;
                $.ajax({
                    url: '/deleteItems',
                    type: "POST",
                    dataType: 'json',
                    contentType: "application/json",
                    data: JSON.stringify(filename),
                    complete: function (t, status) {
                        if (t.status === 200) {
                            $('.checkboxinpt:checked').each( function( index, element ){
                                $(element).parents('.required__photos_wrapper').remove();
                            });
                            if ($('.required__photos_wrapper').length){
                                changeIndex();
                                $('.required__photos_wrapper').each( function( index, element ){
                                    var el = $(element).find('img');
                                    var filename = el.attr('src').split('/')[2].split('.')[1];
                                    var src = '/files/' + (index +1) + '.' + filename.split('p=')[0] + "p=" + makeid(7);
                                    el.attr('src', src);
                                    el.next().next().find('.required__photo_menu--item-show').attr('href', src);
                                });
                            }
                        }
                    }
                });
            }
        }else{
            alert("please select a file")
        }
    });

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
});