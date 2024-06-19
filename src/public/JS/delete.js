function deleteMemberHandle(a) {
    const check = confirm("Are you sure you want to delete this member?");
    if (check) {
        const row = $(a).closest('tr');
        const memberName = row.find('.name').text();

        const xhr = new XMLHttpRequest();

        const requestData = {
            id: a.id,
            name: memberName
        }


        const jsonData = JSON.stringify(requestData);

        // Set the request method and URL
        xhr.open('POST', 'http://localhost:3000/update/delete', true);

        // Set the request header
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(jsonData);
        // Set the onload callback function
        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                alert(response.msg);
            } else {
                console.log('Error sending data');
            }
        };
    }
}

