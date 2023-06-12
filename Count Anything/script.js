const counterLabelText = document.getElementById("counterLabel")
const startingCountText = document.getElementById("startingCount")
const countTargetText = document.getElementById("countTarget")
const startCountingButton = document.getElementById("startCountingButton")


startCountingButton.addEventListener("click", startCounting)


function startCounting() {
  let entered = false
  const counterLabel = counterLabelText.value
  const startingCount = parseInt(startingCountText.value)
  const countTarget = countTargetText.value
  let emptyValue = false

  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) == counterLabel) {
      console.log(localStorage.key(i))
      entered = true
      break
    }
  }

  if (counterLabel == "" || startingCount == "" || countTarget == "") {
    emptyValue = true
  }

  if (emptyValue == false) {
    if (entered == false) {
      localStorage.setItem(counterLabel, JSON.stringify({ startingCount, countTarget }))

      createNewCount(counterLabel, startingCount, countTarget)
    }
    else {
      alert("farklı bir counter label giriniz.")
    }

  }
  else {
    alert("formda alanlar boş bırakılamaz.")
  }

  clearInput(counterLabelText, startingCountText, countTargetText)

}


function checkTarget(currentCount, countTarget, div) {
  if (currentCount >= countTarget) {
    div.style.backgroundColor = "red"
  }
  else {
    div.style.backgroundColor = "#A5C9CA"
  }
}


function clearInput(counterLabel, startingCount, countTarget) {
  counterLabel.value = ""
  startingCount.value = ""
  countTarget.value = ""
}


function createNewCount(counterLabel, startingCount, countTarget) {
  const containerDiv = document.createElement("div")
  containerDiv.classList.add("counter")
  document.body.appendChild(containerDiv)

  checkTarget(startingCount, countTarget, containerDiv)

  const div = document.createElement("div")
  div.classList.add("counter-div")
  containerDiv.appendChild(div)

  const counterLabelElement = document.createElement("h2")
  counterLabelElement.textContent = counterLabel

  const divJoining = document.createElement("div")
  divJoining.classList.add("container1")

  const text = document.createElement("h3")
  text.textContent = "Current Count: "
  text.classList.add("text")

  const startingCountElement = document.createElement("h3")
  startingCountElement.textContent = startingCount

  divJoining.appendChild(text)
  divJoining.appendChild(startingCountElement)

  const countTargetElement = document.createElement("h3")
  countTargetElement.textContent = `Count Target: ${countTarget}`


  div.appendChild(counterLabelElement)
  div.appendChild(divJoining)
  div.appendChild(countTargetElement)

  createButtons(containerDiv, startingCountElement, counterLabel, countTarget);
}


function createButtons(containerDiv, startingCountElement, counterLabel, countTarget) {
  const decreaseButtonElement = document.createElement("button")
  decreaseButtonElement.classList.add("button-style")
  containerDiv.appendChild(decreaseButtonElement)
  const increaseButtonElement = document.createElement("button")
  increaseButtonElement.classList.add("button-style")
  containerDiv.appendChild(increaseButtonElement)
  const decreaseIcon = document.createElement("i")
  decreaseIcon.className = "fas fa-sharp fa-solid fa-arrow-down"
  decreaseButtonElement.appendChild(decreaseIcon)
  const increaseIcon = document.createElement("i")
  increaseIcon.className = "fas fa-sharp fa-solid fa-arrow-up"
  increaseButtonElement.appendChild(increaseIcon)
  const deleteButtonElement = document.createElement("button")
  deleteButtonElement.classList.add("button-style")
  deleteButtonElement.classList.add("delete")
  deleteButtonElement.textContent = "X"
  containerDiv.appendChild(deleteButtonElement)

  increaseButtonElement.addEventListener("click", function () {
    let count = parseInt(startingCountElement.textContent)
    count += 1
    startingCountElement.textContent = count
    localStorage.setItem(counterLabel, JSON.stringify({ startingCount: count, countTarget }));
    checkTarget(count, countTarget, containerDiv)
  })

  decreaseButtonElement.addEventListener("click", function () {
    let count = parseInt(startingCountElement.textContent)
    count -= 1
    startingCountElement.textContent = count
    localStorage.setItem(counterLabel, JSON.stringify({ startingCount: count, countTarget }));
    checkTarget(count, countTarget, containerDiv)
  })
  deleteButtonElement.addEventListener("click", function () {
    containerDiv.remove()
    localStorage.removeItem(counterLabel)
  })
}


window.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < localStorage.length; i++) {
    const counterLabel = localStorage.key(i)
    const counterData = JSON.parse(localStorage.getItem(counterLabel))
    const startingCount = counterData.startingCount
    const countTarget = counterData.countTarget
    createNewCount(counterLabel, startingCount, countTarget)
  }
})




