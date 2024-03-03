const input = document.querySelector("input");
const btn = document.querySelector("button");
const info = document.querySelector("#info");

function getShortedLink(id) {
  return document.location.href + id;
}

function displayLink(link) {
  info.style.color = "var(--color)";
  info.style.display = "block";
  info.textContent = link + "\n(Copied to clipboard)";
}

function displayError(err) {
  info.style.color = "var(--error)";
  info.style.display = "block";
  info.textContent = err || "Error";
}

btn.addEventListener("click", async function () {
  try {
    const url = input.value;

    if (
      url.trim() === "" ||
      !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6}).+/.test(url)
    ) {
      throw new Error("Invalid URL");
    }

    const req = await fetch("/add/" + encodeURIComponent(url));
    const rep = await req.json();
    if (rep.status === "OK") {
      const link = getShortedLink(rep.data.id);
      navigator.clipboard.writeText(link);
      displayLink(link);
    }
  } catch (e) {
    displayError(e);
  }
});