window.currentRowID = 0;
window.updateID = undefined;
$(document).ready(function () {
    $("#personAddUpdateForm").submit(function (event) {
        event.preventDefault();
        console.log(event.target.elements);
        $.ajax({
            url : "/faculty",
            type: "POST",
            data: new FormData(event.target),
            cache: false,
            processData: false,
            contentType: false,
        }).done(function (response) {
            console.log(response);
        }).catch(error => {
            console.log(error)
        })

        $("#addBtn").removeAttr("disabled");
        $("#updateBtn").attr("disabled", "disabled");
        event.target.reset();
    });
    $("#list tbody").on("click", ".update", function (e) {
        window.updateID = $(e.currentTarget.closest('tr')).attr("id");
        $("input[name='name']").val($("#" + window.updateID + " .name").text());
        $("input[name='gender']#"+$("#"+window.updateID+" .gender").text().toLowerCase()).prop('checked',true);
        $("input[name='age']").val($("#"+window.updateID+" .age").text());
        $("select[name='city']").val($("#" + window.updateID + " .city").text());
        $("#updateBtn").removeAttr("disabled");
        $("#addBtn").attr("disabled", "disabled");
    }).on("click",".delete",function (e) {
        if (confirm("Are you sure you want to delete this Record")) {

            e.currentTarget.closest('tr').remove();
            if ($('#list tbody tr').length <= 0) {
                $("#list tbody").append(function () {
                    return "<tr id=\"noRecordRow\">" +
                        "<td colspan=\"5\" class=\"text-center\">No Record Found</td>" +
                        "</tr>";
                });
            }
        }
    });
    $.get("/faculty",function(response) {
        if(response.length>0){
            $("#noRecordRow").remove();
            response.forEach((value) => {
                $("#list tbody").append(function () {
                    return "<tr id=\"" + value._id + "\">" +
                        "<td class=\"name\">" + value.name + "</td>" +
                        "<td class=\"gender\">" + value.gender + "</td>" +
                        "<td class=\"email\">" + value.email + "</td>" +
                        "<td class=\"street_address\">" + value.address.street_address + "</td>" +
                        "<td class=\"city\">" + value.address.city + "</td>" +
                        "<td class=\"country\">" + value.address.country + "</td>" +
                        "<td class=\"course_code\">" + value.course_code + "</td>" +
                        "<td class=\"phone_numbers\">" + value.phone_numbers.join(",") + "</td>" +
                        "<td>" +
                        "<button class=\"btn btn-warning update\">Update</button>" +
                        "<button class=\"btn btn-danger delete\">Delete</button>" +
                        "</td ></tr>";
                });
            });
        }else{
            $("#noRecordRow").text("No Record Found In Database");
        }
    });
    $("#addFacultyRecord").click(function (){
        $("#FormTitle").text("Add Faculty Record");
        $("#addUpdateModal").modal("show");
    });
    $(".close").click(function (){
        $("#FormTitle").text("");
        $("#addUpdateModal").modal("hide");
    })
});