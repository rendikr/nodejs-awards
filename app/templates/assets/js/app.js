const loginForm = document.querySelector('form')

const action = document.querySelector('#action')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const actionValue = action.value

    if (actionValue == 'signIn') {
		const email = document.querySelector('#email')
		const emailValue = email.value
        messageOne.textContent = 'Logging in...'
        messageTwo.textContent = ''
        fetch('/sign-in?email=' + emailValue).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = 'Berhasil login'
                    messageTwo.textContent = `Email: ${email}`

                    email.value = ''
                }
            })
        })
    } else if (actionValue == 'edit') {
        messageOne.textContent = 'Mengubah berat badan...'
        messageTwo.textContent = ''
        const id = document.querySelector('#id')
        const idValue = id.value
        fetch('/edit-bb?id='+idValue+'&tanggal=' + tanggalValue + '&max=' + maxValue + '&min=' + minValue).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = 'Berhasil mengupdate berat badan'
                    messageTwo.textContent = `Tanggal: ${data.item.date} | Max: ${data.item.max} | Min: ${data.item.min} | Difference: ${data.item.difference}`

                    tanggal.value = ''
                    max.value = ''
                    min.value = ''
                }
            })
        })
    } else if (actionValue == 'hapus') {
        messageOne.textContent = 'Menghapus berat badan...'
        messageTwo.textContent = ''
        const id = document.querySelector('#id')
        const idValue = id.value
        fetch('/hapus-bb?id='+idValue).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = 'Berhasil menghapus berat badan'
                }
            })
        })
    }
})
