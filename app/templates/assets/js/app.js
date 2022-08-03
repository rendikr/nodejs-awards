const loginForm = document.querySelector('form');

const action = document.querySelector('#action');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const actionValue = action.value;
    if (actionValue == 'signIn') {
        messageOne.textContent = 'Logging in...';
        messageTwo.textContent = '';

        const email = document.querySelector('#email');
        const password = document.querySelector('#password');
        const emailValue = email.value;
        const passwordValue = password.value;

        fetch('/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue,
            }),
        }).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    const { email, is_admin } = data.data;
                    const { token } = data;
                    messageOne.textContent = 'Berhasil login';
                    messageTwo.textContent = `Email: ${email}`;

                    email.value = '';
                    password.value = '';

                    if (is_admin) {
                        window.location.href = `/dashboard?token=${token}`;
                    } else {
                        window.location.href = `/customer/awards?token=${token}`;
                    }
                }
            });
        });
    } else if (actionValue == 'awardFilter') {
        messageThree.textContent = 'Filter Award...';
        const pointStart = document.querySelector('#point_start')
        const pointEnd = document.querySelector('#point_end')
        let pointStartValues = parseInt(pointStart.value)
        let pointEndValues = parseInt(pointEnd.value)

        if (isNaN(pointStartValues)) pointStartValues = 0;
        if (isNaN(pointEndValues)) pointEndValues = 0;

        const checked = document.querySelectorAll('input[type="checkbox"]:checked')
        const selectedType = Array.from(checked).map(x => x.value)

        if (pointStartValues > pointEndValues) {
            messageThree.textContent = 'Point Range Start tidak boleh melebihi Point Range End';
        } else {
            const params = new URLSearchParams(window.location.search)

            let token = params.get('token')

            window.location.href = `/customer/awards?token=${token}&type=${encodeURIComponent(selectedType)}&point_start=${encodeURIComponent(pointStartValues)}&point_end=${encodeURIComponent(pointEndValues)}`;
        }

    } else if (actionValue == 'addAward') {
        messageOne.textContent = 'Menambahkan Award...';
        messageTwo.textContent = '';
        const id = document.querySelector('#id');
        const idValue = id.value;
        fetch(
            '/edit-bb?id=' +
                idValue +
                '&tanggal=' +
                tanggalValue +
                '&max=' +
                maxValue +
                '&min=' +
                minValue
        ).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = 'Berhasil mengupdate berat badan';
                    messageTwo.textContent = `Tanggal: ${data.item.date} | Max: ${data.item.max} | Min: ${data.item.min} | Difference: ${data.item.difference}`;

                    tanggal.value = '';
                    max.value = '';
                    min.value = '';
                }
            });
        });
    } else if (actionValue == 'addUser') {
        messageOne.textContent = 'Menambahkan User...';
        messageTwo.textContent = '';
        const id = document.querySelector('#id');
        const idValue = id.value;
        fetch('/hapus-bb?id=' + idValue).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = 'Berhasil menghapus berat badan';
                }
            });
        });
    }
});
