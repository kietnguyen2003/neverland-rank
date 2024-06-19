
function update(element, sig) {
    const className = event.target.className;
    const row = $(element).closest('tr');
    const winValueElement = row.find('.winValue');
    const loseValueElement = row.find('.loseValue');
    const w15ValueElement = row.find('.w15Value');
    const l15ValueElement = row.find('.l15Value');
    const sdValueElement = row.find('.sdValue');
    const ptsValueElement = row.find('.ptsValue');
    // Lấy giá trị hiện tại
    let winValue = parseInt(winValueElement.text());
    let loseValue = parseInt(loseValueElement.text());
    let w15Value = parseInt(w15ValueElement.text());
    let l15Value = parseInt(l15ValueElement.text());
    let sdValue = parseInt(sdValueElement.text());
    let ptsValue = parseInt(ptsValueElement.text());

    //
    if (className == 'lose') {
        loseValue += sig;
        sdValue -= sig;
    } else if (className == 'l15') {
        l15Value += sig;
        sdValue -= sig;
    } else if (className == 'win') {
        winValue += sig;
        sdValue += sig;
        ptsValue += sig ;
    } else if (className == 'w15') {
        w15Value += sig;
        sdValue += sig;
        ptsValue += sig * 2;

    }
    // Cập nhật giá trị mới
    winValueElement.text(winValue);
    loseValueElement.text(loseValue);
    w15ValueElement.text(w15Value);
    l15ValueElement.text(l15Value);
    sdValueElement.text(sdValue);
    ptsValueElement.text(ptsValue);
}

function doneUpdate() {
    const data = [];

    // Lặp qua từng hàng trong bảng males
    $('#male tbody tr').each(function () {
        const row = $(this);
        const index = row.find('td:eq(0)').text();
        const img = row.find('.imgCell img').attr('src');
        const name = row.find('.imgCell').text().replace(index, '').trim();
        const win = row.find('.winValue').text();
        const lose = row.find('.loseValue').text();
        const sd = row.find('.sdValue').text();
        const w15 = row.find('.w15Value').text();
        const l15 = row.find('.l15Value').text();

        const playerData = {
            Img: img,
            Name: name,
            Win: win,
            Lose: lose,
            SD: sd,
            W15: w15,
            L15: l15
        };
        data.push(playerData);
    });

    const className = event.target.id;

    // Tạo một đối tượng chứa cả jsonData và jsonDataGender
    const requestData = {
        data: data,
        gender: className
    };

    // Convert requestData to JSON string
    const jsonData = JSON.stringify(requestData);

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    // Set the request method and URL
    xhr.open('POST', `http://localhost:5000/update/done`, true);

    // Set the request header
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Set the onload callback function
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            alert(response.msg);
        } else {
            console.log('Error sending data');
        }
    };

    // Send the request with the JSON data
    xhr.send(jsonData);
}

function reset() {
    const data = [];

    // Lặp qua từng hàng trong bảng males
    $('#male tbody tr').each(function () {
        const row = $(this);
        const index = row.find('td:eq(0)').text();
        const img = row.find('.imgCell img').attr('src');
        const name = row.find('.imgCell').text().replace(index, '').trim();

        const playerData = {
            Img: img,
            Name: name,
            Win: 0,
            Lose: 0,
            SD: 0,
            W15: 0,
            L15: 0
        };
        data.push(playerData);
    });

    const className = event.target.id;

    // Tạo một đối tượng chứa cả jsonData và jsonDataGender
    const requestData = {
        data: data,
        gender: className
    };

    // Convert requestData to JSON string
    const jsonData = JSON.stringify(requestData);

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Set the request method and URL
    xhr.open('POST', `http://localhost:5000/update/done`, true);

    // Set the request header
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Set the onload callback function
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            alert(response.msg);
        } else {
            console.log('Error sending data');
        }
    };

    // Send the request with the JSON data
    xhr.send(jsonData);
}

