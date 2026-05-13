import data from "./data.json" with { type: "json" };
// Default datas
let visibleInfo = "weekly";
let colorOfBackground = [
  "bg-orange-300",
  "bg-blue-300",
  "bg-pink-400",
  "bg-green-400",
  "bg-purple-700",
  "bg-yellow-300",
];
let arrayOfArticles = [];

// Selecting of the elements
const rangeEl = document.querySelector(".range");
const rangeOptions = document.querySelectorAll(".range-option");
const mainContainer = document.querySelector(".main-content");

// Initial state
data?.forEach((item, i) => {
  let bgPosition =
    item.title === "Exercise"
      ? "bg-position-[93%_0%]"
      : "bg-position-[93%_-10%]";

  let icon = item.title.replace(" ", "").toLowerCase();

  let article = `
        <article
          class="group relative ${colorOfBackground[i]} rounded-[15px] pt-9.5 bg-[url('images/icon-${icon}.svg')] bg-no-repeat ${bgPosition} cursor-pointer"
        >
          <div
            class="p-6 bg-navy-900 group-hover:bg-navy-800 rounded-[15px] h-full w-full xl:p-8"
          >
            <div class="flex justify-between items-center mb-8 md:mb-4 xl:mb-6">
              <p class="preset-5-medium text-white">${item.title}</p>
              <p class="fill-navy-200 hover:fill-white">
                <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                  <path
                    class="fill-inherit"
                    d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                    fill="#BBC0FF"
                    fill-rule="evenodd"
                  />
                </svg>
              </p>
            </div>
            <div class="description relative overflow-hidden">
              <!-- Daily -->
              <div class="daily absolute-position">
                <p class="daily-actual preset-3 text-white md:preset-1">${item.timeframes.daily.current}hrs</p>
                <p class="daily-last preset-6 text-navy-200">Yesteday - ${item.timeframes.daily.previous}hrs</p>
              </div>

             <!-- Weekly -->
             <div class="weekly active-period">
               <p class="weekly-actual preset-3 text-white md:preset-1">
                 ${item.timeframes.weekly.current}hrs
               </p>
               <p class="weekly-last preset-6 text-navy-200">
                 Last Week - ${item.timeframes.weekly.previous}hrs
               </p>
              </div>

             <!-- Monthly -->
             <div class="monthly absolute-position">
               <p class="monthly-actual preset-3 text-white md:preset-1">
                 ${item.timeframes.monthly.current}hrs
               </p>
               <p class="monthly-last preset-6 text-navy-200">
                 Last Month - ${item.timeframes.monthly.previous}hrs
               </p>
             </div>
           </div>
          </div>
        </article>`;

  arrayOfArticles.push(article);
});

let htmlToInsert = arrayOfArticles.join("");

mainContainer.innerHTML = htmlToInsert;

rangeEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("range-option")) {
    rangeOptions.forEach((range) => {
      if (range.classList.contains("active-category") && range === e.target) {
        return;
      }

      if (range.classList.contains("active-category")) {
        range.classList.remove("active-category");
        range.classList.add("text-purple-500");
      } else if (range === e.target) {
        range.classList.remove("text-purple-500");
        range.classList.add("active-category");
        animation(visibleInfo, range.dataset.value);
      }
    });
  }
});

function animation(visible, selected) {
  let visibleEls = document.querySelectorAll(`.${visible}`);
  let selectedEls = document.querySelectorAll(`.${selected}`);

  visibleInfo = selected;

  visibleEls.forEach((el) => {
    el.classList.add("animate-move-out");
    el.addEventListener(
      "animationend",
      () => {
        el.classList.remove("active-period");
        el.classList.add("absolute-position");
        el.classList.remove("animate-move-out");
      },
      { once: true },
    );
  });

  selectedEls.forEach((el) => {
    el.classList.add("animate-move-in");
    el.classList.add("active-period");

    el.addEventListener(
      "animationend",
      () => {
        el.classList.remove("absolute-position");
        el.classList.remove("animate-move-in");
      },
      { once: true },
    );
  });
}
