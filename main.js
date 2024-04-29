let postsId = document.getElementById("posts");

async function getData() {
  try {
    const getDataFetch = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    if (!getDataFetch.ok) {
      throw new Error("Network response was not ok");
    }
    return getDataFetch.json();
  } catch (error) {
    console.log(error);
  }
}

async function showData() {
  let posts;

  try {
    posts = await getData();

    postsId.innerHTML = "";

    posts.forEach((post) => {
      let li = document.createElement("li");

      li.textContent = post.title;
      li.setAttribute("data-id", post.id);
      li.style.marginBottom = "5px";
      li.style.cursor = "progress";
      postsId.appendChild(li);
      deletePost(li);
    });

    filter();
  } catch (error) {
    console.log(error);
  }
}

async function filter() {
  let filterInput = document.getElementById("filter");

  filterInput.addEventListener("input", () => {
    let filterValue = filterInput.value.toLowerCase();
    let lis = postsId.getElementsByTagName("li");
    for (let i = 0; i < lis.length; i++) {
      let title = lis[i].textContent.toLowerCase();
      if (title.includes(filterValue)) {
        lis[i].style.display = "block";
      } else {
        lis[i].style.display = "none";
      }
    }
  });
}

async function deletePost(li) {
  li.addEventListener("click", async (event) => {
    if (event.target.tagName === "LI") {
      let postId = event.target.getAttribute("data-id");
      let url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

      try {
        const response = await fetch(url, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete");
        }

        event.target.remove();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  });
}

showData();
