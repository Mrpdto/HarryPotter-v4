const title = document.querySelectorAll(".userName");
const email = document.querySelectorAll(".userEmail");
const logout = document.getElementById("logout");

// Event Delegation
document.addEventListener('click', (e) => {

  const target = e.target;

  if (target.id === 'logout') {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
  }
})


const fetchUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login.html";
    return;
  }

  const response = await fetch(`/getMyProfile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    window.location.href = "/login.html";
    return;
  } else if (response.status === 403) {
    window.location.href = "/login.html";
    return;
  }

  const user = await response.json();

  title.forEach(element => {
    element.innerHTML = user.name;
  });
  email.forEach(element => {
    element.innerHTML = user.email;
  });

};

(async () => {

  await fetchUser();

})();