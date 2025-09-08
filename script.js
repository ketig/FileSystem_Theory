function toggleSection(sectionId) {
  const content = document.getElementById(sectionId);
  const header = content.previousElementSibling;
  const icon = header.querySelector(".toggle-icon");

  if (content.classList.contains("active")) {
    content.classList.remove("active");
    icon.classList.remove("active");
  } else {
    content.classList.add("active");
    icon.classList.add("active");
  }
}

// პირველი სექციის ავტომატური გახსნა
document.addEventListener("DOMContentLoaded", function () {
  toggleSection("session-plan");
});

// Header-ებზე hover ეფექტი
document.querySelectorAll(".section-header").forEach((header) => {
  header.addEventListener("mouseenter", function () {
    this.style.transform = "translateX(5px)";
  });

  header.addEventListener("mouseleave", function () {
    this.style.transform = "translateX(0)";
  });
});

// კოდის ბლოკების copy ფუნქციონალი
document.querySelectorAll(".code-block").forEach((block) => {
  block.addEventListener("dblclick", function () {
    const range = document.createRange();
    range.selectNode(this);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
      document.execCommand("copy");

      // წარმატების ინდიკაცია
      const originalBorder = this.style.borderLeft;
      this.style.borderLeft = "4px solid #48bb78";

      setTimeout(() => {
        this.style.borderLeft = originalBorder;
      }, 1000);
    } catch (err) {
      console.log("Copy failed");
    }

    window.getSelection().removeAllRanges();
  });

  // Tooltip დამატება
  block.title = "ორმაგი კლიკი კოდის კოპირებისთვის";
});

// Scroll to top ღილაკი
const scrollButton = document.createElement("div");
scrollButton.innerHTML = "⬆️";
scrollButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
            font-size: 20px;
        `;

document.body.appendChild(scrollButton);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollButton.style.opacity = "1";
    scrollButton.style.transform = "scale(1)";
  } else {
    scrollButton.style.opacity = "0";
    scrollButton.style.transform = "scale(0.8)";
  }
});

scrollButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

scrollButton.addEventListener("mouseenter", () => {
  scrollButton.style.transform = "scale(1.1)";
});

scrollButton.addEventListener("mouseleave", () => {
  scrollButton.style.transform = "scale(1)";
});

// Progress bar
const progressBar = document.createElement("div");
progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            z-index: 9999;
            transition: width 0.3s ease;
        `;

document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const scrolled =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = scrolled + "%";
});
