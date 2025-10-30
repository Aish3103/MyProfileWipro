// Dummy students - simple authentication
const students = [
    { username: "raj", password: "123" },
    { username: "john", password: "abc" }
  ];
  
  // Monthly activities array
  const activities = [
    { id: 1, activity: "Create project file which contains tables between 12 to 19", subject: "Maths" },
    { id: 2, activity: "Science lab for chemical reactions", subject: "Science" },
    { id: 3, activity: "English essay writing", subject: "English" },
    { id: 4, activity: "Maths quiz preparation", subject: "Maths" }
  ];
  
  // DOM Elements
  const authSection = document.getElementById("auth");
  const welcomeSection = document.getElementById("welcome");
  const monthlySection = document.getElementById("monthly");
  const menu = document.getElementById("menu");
  const loginBtn = document.getElementById("loginBtn");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const authMsg = document.getElementById("authMsg");
  const subjectSelect = document.getElementById("subjectSelect");
  const activityList = document.getElementById("activityList");
  
  let loggedInUser = null;
  
  // Update menu after login
  function updateMenu() {
    menu.innerHTML = `
      <li><a href="#" id="homeBtn">Home</a></li>
      <li><a href="#" id="monthlyBtn">Monthly Chart</a></li>
      <li><a href="#" id="logoutBtn">Logout</a></li>
    `;
  
    document.getElementById("homeBtn").addEventListener("click", () => {
      showSection("welcome");
    });
    document.getElementById("monthlyBtn").addEventListener("click", () => {
      showSection("monthly");
    });
    document.getElementById("logoutBtn").addEventListener("click", () => {
      logout();
    });
  }
  
  // Show/hide sections
  function showSection(section) {
    authSection.classList.add("hidden");
    welcomeSection.classList.add("hidden");
    monthlySection.classList.add("hidden");
  
    if (section === "welcome") welcomeSection.classList.remove("hidden");
    if (section === "monthly") {
      monthlySection.classList.remove("hidden");
      renderActivities("all");
    }
  }
  
  // Render activities based on selected subject
  function renderActivities(subject) {
    activityList.innerHTML = "";
    const filtered = subject === "all" ? activities : activities.filter(a => a.subject === subject);
    filtered.forEach(a => {
      const li = document.createElement("li");
      li.textContent = `${a.subject}: ${a.activity}`;
      activityList.appendChild(li);
    });
  }
  
  // Login button click
  loginBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
  
    const user = students.find(s => s.username === username && s.password === password);
    if (user) {
      loggedInUser = user.username;
      authMsg.textContent = "";
      updateMenu();
      showSection("welcome");
    } else {
      authMsg.textContent = "Invalid username or password";
    }
  });
  
  // Filter activities when subject changed
  subjectSelect.addEventListener("change", e => {
    renderActivities(e.target.value);
  });
  
  // On page load show login
  showSection("auth");
  
  // Logout function
  function logout() {
    loggedInUser = null;
    menu.innerHTML = "";
    authSection.classList.remove("hidden");
    welcomeSection.classList.add("hidden");
    monthlySection.classList.add("hidden");
    usernameInput.value = "";
    passwordInput.value = "";
    authMsg.textContent = "";
  }


