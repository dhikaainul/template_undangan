// const jquery = require("./jquery");

// const $=jquery
const guestName = document.getElementById("guestName")
const eventName = document.getElementById("eventName")
const eventDetail = document.getElementById("eventDetails")
const guestQR = document.getElementById("guestQR")
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?eventId=abcsd"
let eventId = params.eventId; // "some_value"
let id = params.parId

console.log(eventId)
console.log(id)
// console.log(id)

function fetchGuestData(eventId, guestId) {
  fetch(`https://backend-api-3w5kgkxgka-et.a.run.app/invitation/${eventId}/${guestId}`, {
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json()).then(res => {
    fetch(`https://backend-api-3w5kgkxgka-et.a.run.app/events/${eventId}`).then(eventRes => eventRes.json()).then(eventRes => {
      let guestData = res.data
      console.log(guestData)
      let eventData = eventRes.data
      console.log(eventData)
      let newDate = new Date(eventData.start_datetime).toLocaleString('id-ID', { weekday: 'long', year: 'numeric', month: "long", day: "numeric" })
      let newTime = new Date(eventData.start_datetime).toLocaleString('id-ID', { hour: "numeric", minute: "numeric" })
      guestName.innerHTML = guestData.name
      eventName.innerHTML = eventData.name
      eventDetail.innerHTML = `Hari/Tanggal&nbsp; &nbsp; &nbsp; &nbsp; : ${newDate}<br>Waktu&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : ${newTime}<br>${guestData.category_1}&nbsp; &nbsp; &nbsp;: ${guestData.category_1_value}<br>${guestData.category_2}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; : ${guestData.category_2_value}&nbsp;<br>Tempat&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;: ${eventData.location.address}`
      guestQR.src = "https://firebasestorage.googleapis.com/v0/b/attendance-system-2a5f1.appspot.com/o/qr_code%2FpjVHNiVmUM8kAVD2NnQc%2F1841720158?alt=media"
    })

  })
}

fetchGuestData(eventId, id)