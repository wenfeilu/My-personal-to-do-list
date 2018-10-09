/*
 * @author Wenfei Oct 8th, 2018
 * @reference: https://www.sitepoint.com/building-list-jquery-local-storage/
 * 
 */


var todo = todo || {},
    data = JSON.parse(localStorage.getItem("todoData"));

data = data || {};

(function(todo, data, $) {

    var defaults = {
            todoTask: "todo-task",
            todoHeader: "task-header",
            todoDate: "task-date",
            todoDescription: "task-description",
            taskId: "task-",
            formId: "todo-form",
            dataAttribute: "data",
            deleteDiv: "delete-div"
        }, codes = {
            "1" : "#inProgress",
            "2" : "#completed",
            "3" : "#frequentlyUse",
            "4" : "#work",
            "5" : "#life",
            "6" : "#other"

        };

    todo.init = function (options) {

        options = options || {};
        options = $.extend({}, defaults, options);
        console.log(data);

        $.each(data, function (index, params) {
            generateElement(params);
        });

        /*generateElement({
            id: "123",
            code: "1",
            title: "asd",
            date: "22/12/2013",
            description: "Blah Blah"
        });*/

        /*removeElement({
            id: "123",
            code: "1",
            title: "asd",
            date: "22/12/2013",
            description: "Blah Blah"
        });*/

        //Adding drop function to each category of task
        $.each(codes, function (index, value) {
            $(value).droppable({
                drop: function (event, ui) {
                        var element = ui.helper,
                            css_id = element.attr("id"),
                            id = css_id.replace(options.taskId, ""),
                            object = data[id];
                            console.log(ui);

                            // Removing old element
                            removeElement(object);

                            // Changing object code
                            object.code = index;

                            // Generating new element
                            generateElement(object);

                            $("#" + "trashbin" + defaults.taskId + object.id).on("click", function(){
                                removeElement(object);
                                 })

                            $("#" + "trashbin" + defaults.taskId + object.id + "work").on("click", function(){
                                removeElement(object);
                            
                            })
                            $("#" + "trashbin" + defaults.taskId + object.id + "life").on("click", function(){
                                removeElement(object);
                            
                            })
                            $("#" + "trashbin" + defaults.taskId + object.id + "other").on("click", function(){
                                removeElement(object);
                            
                            })

                            // Updating Local Storage
                            data[id] = object;
                            localStorage.setItem("todoData", JSON.stringify(data));

                            // Hiding Delete Area
                            $("#" + defaults.deleteDiv).hide();
                    }
            });
        });

        
        $.each(data, function (index, params) {
            $("#" + "trashbin" + defaults.taskId + params.id).on("click", function(){
            removeElement(params);
            
            })
            $("#" + "trashbin" + defaults.taskId + params.id + "work").on("click", function(){
            removeElement(params);
            
            })
            $("#" + "trashbin" + defaults.taskId + params.id + "life").on("click", function(){
            removeElement(params);
            
            })
            $("#" + "trashbin" + defaults.taskId + params.id + "other").on("click", function(){
            removeElement(params);
            
            })
            
        });

        // $("#" + "trashbin" + defaults.taskId + params.id ).on("click", function(){
        //     alert("The paragraph was clicked.");

        //     $("." + options.taskId + data.id).remove();
        // })

    };

    // Add Task
    var generateElement = function(params){
        var parent = $(codes[params.code]),
            wrapper;

        if (!parent) {
            return;
        }

        wrapper = $("<div />", {
            "class" : defaults.todoTask,
            "id" : defaults.taskId + params.id,
            "data" : params.id
        }).appendTo(parent);

        $("<div />", {
            "class" : defaults.todoHeader,
            "text": params.title
        }).appendTo(wrapper);

        $("<div />", {
            "class" : defaults.todoDate,
            "text": params.date
        }).appendTo(wrapper);

        $("<div />", {
            "class" : defaults.todoDescription,
            "text": params.description
        }).appendTo(wrapper);
        $("<i />", {
            "class" : "fa fa-trash",
            "aria-hidden": "true",
            "id" : "trashbin" + defaults.taskId + params.id
            
        }).appendTo(wrapper);

	    wrapper.draggable({
            
	        revert: "invalid",
	        revertDuration : 200
        });
        if (params.work) {
            var parentWork = "#work",
                wrapperWork;
            wrapperWork = $("<div />", {
                "class" : defaults.todoTask,
                "id" : defaults.taskId + params.id + "work",
                "data" : params.id
            }).appendTo(parentWork);

            $("<div />", {
                "class" : defaults.todoHeader,
                "text": params.title
            }).appendTo(wrapperWork);

            $("<div />", {
                "class" : defaults.todoDate,
                "text": params.date
            }).appendTo(wrapperWork);

            $("<div />", {
                "class" : defaults.todoDescription,
                "text": params.description
            }).appendTo(wrapperWork);
            $("<i />", {
                "class" : "fa fa-trash",
                "aria-hidden": "true",
                "id" : "trashbin" + defaults.taskId + params.id + "work"
                
            }).appendTo(wrapperWork);

        }
        // wrapperWork.draggable({
        //     // start: function() {
        //     //     $("#" + defaults.deleteDiv).show();
        //     // },
        //     // stop: function() {
        //     //     $("#" + defaults.deleteDiv).hide();
        //     // },
        //     revert: "invalid",
        //     revertDuration : 200
        // });
        if (params.life) {
            var parentLife = "#life",
                wrapperLife;
            wrapperLife = $("<div />", {
                "class" : defaults.todoTask,
                "id" : defaults.taskId + params.id + "life",
                "data" : params.id
            }).appendTo(parentLife);

            $("<div />", {
                "class" : defaults.todoHeader,
                "text": params.title
            }).appendTo(wrapperLife);

            $("<div />", {
                "class" : defaults.todoDate,
                "text": params.date
            }).appendTo(wrapperLife);

            $("<div />", {
                "class" : defaults.todoDescription,
                "text": params.description
            }).appendTo(wrapperLife);
            $("<i />", {
                "class" : "fa fa-trash",
                "aria-hidden": "true",
                "id" : "trashbin" + defaults.taskId + params.id + "life"
                
            }).appendTo(wrapperLife);

        }
        
        if (params.other) {
            var parentOther = "#other",
                wrapperOther;
            wrapperOther = $("<div />", {
                "class" : defaults.todoTask,
                "id" : defaults.taskId + params.id + "other",
                "data" : params.id
            }).appendTo(parentOther);

            $("<div />", {
                "class" : defaults.todoHeader,
                "text": params.title
            }).appendTo(wrapperOther);

            $("<div />", {
                "class" : defaults.todoDate,
                "text": params.date
            }).appendTo(wrapperOther);

            $("<div />", {
                "class" : defaults.todoDescription,
                "text": params.description
            }).appendTo(wrapperOther);
            $("<i />", {
                "class" : "fa fa-trash",
                "aria-hidden": "true",
                "id" : "trashbin" + defaults.taskId + params.id + "other"
                
            }).appendTo(wrapperOther);

        }
        

    };

    // Remove task
    var removeElement = function (params) {
        $("#" + defaults.taskId + params.id).remove();
        if (params.work) $("#" + defaults.taskId + params.id + "work").remove();
        if (params.life) $("#" + defaults.taskId + params.id + "life").remove();
        if (params.other) $("#" + defaults.taskId + params.id + "other").remove();


    };

    todo.add = function() {
        var inputs = $("#" + defaults.formId + " :input"),
            errorMessage = "Title can not be empty",
            id, title, description, date, work, life, other, tempData;

        if (inputs.length !== 7) {
            return;
        }

        title = inputs[0].value;
        description = inputs[1].value;
        date = inputs[2].value;
        work = $('#myCheck1').is(":checked");
        life = $('#myCheck2').is(":checked");
        other =  $('#myCheck3').is(":checked");


        if (!title) {
            generateDialog(errorMessage);
            return;
        }

        id = new Date().getTime();

        tempData = {
            id : id,
            code: "1",
            title: title,
            date: date,
            work: work,
            life: life,
            other: other,
            description: description
        };

        // Saving element in local storage
        data[id] = tempData;
        localStorage.setItem("todoData", JSON.stringify(data));

        // Generate Todo Element
        generateElement(tempData);

        $("#" + "trashbin" + defaults.taskId + tempData.id).on("click", function(){
            removeElement(tempData);
            
        })
        $("#" + "trashbin" + defaults.taskId + tempData.id + "work" ).on("click", function(){
            removeElement(tempData);
            
        })
        $("#" + "trashbin" + defaults.taskId + tempData.id + "life" ).on("click", function(){
            removeElement(tempData);
            
        })
        $("#" + "trashbin" + defaults.taskId + tempData.id + "other" ).on("click", function(){
            removeElement(tempData);
            
        })



        // Reset Form
        inputs[0].value = "";
        inputs[1].value = "";
        inputs[2].value = "";


    };

    var generateDialog = function (message) {
        var responseId = "response-dialog",
            title = "iMessaage",
            responseDialog = $("#" + responseId),
            buttonOptions;

        if (!responseDialog.length) {
            responseDialog = $("<div />", {
                    title: title,
                    id: responseId
            }).appendTo($("body"));
        }

        responseDialog.html(message);

        buttonOptions = {
            Ok : function () {
                responseDialog.dialog("close");
            }
        };

	    responseDialog.dialog({
            autoOpen: true,
            width: 400,
            modal: true,
           // closeOnEscape: true,
            buttons: buttonOptions
        });
    };

    todo.clear = function () {
        data = {};
        localStorage.setItem("todoData", JSON.stringify(data));
        $("." + defaults.todoTask).remove();
    };

})(todo, data, jQuery);