const loadData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await response.json();


    const cardContainer = document.getElementById('card-container');

    data.data.tools.forEach(universe => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card bg-base-100 shadow-xl">
                <figure>
                    <img class="rounded-xl h-56 w-full m-5" src="${universe?.image}" alt="" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">Features </h2>
                    <p>1. ${universe?.features[0]}</p>
                    <p>2. ${universe?.features[1]}</p>
                    <p>3. ${universe?.features[2]}</p>

                    <hr class="my-4">

                    <div class="flex justify-between">
                        <div>
                            <h1>${universe?.name}</h1>
                            <p>
                                <i class="fa-solid fa-calendar-days mr-2"></i> ${universe?.published_in}
                            </p>
                        </div>

                        <button onclick="handleShowModal('${universe?.id}')" class="bg-red-50 rounded-full">
                            <i class="fa-solid fa-arrow-right m-4 text-red-500"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(div);
    });
}

const handleShowModal = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await response.json();
    console.log(data.data);

    const show_details_modal = document.getElementById('show_details_modal');
    show_details_modal.innerHTML = `
            <div class="modal-box modal-box w-11/12 max-w-5xl">
                <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <div class="flex flex-col md:flex-col lg:flex-row gap-5">
                    <div class="flex-1 bg-red-50 border-red-300 rounded-2xl border-2 p-10">
                        <h3 class="font-bold text-2xl mb-5">${data?.data?.description}</h3>

                        <div class="flex flex-wrap justify-between gap-5">
                            <div class="p-5 bg-white rounded-2xl text-center text-green-600 font-bold">
                            ${data?.data?.pricing[0].price} <br>
                            ${data?.data?.pricing[0].plan}
                            </div>

                            <div class="p-5 bg-white rounded-2xl text-center text-orange-600 font-bold">
                            ${data?.data?.pricing[1].price} <br>
                            ${data?.data?.pricing[1].plan}
                            </div>

                            <div class="p-5 bg-white rounded-2xl text-center text-red-600 font-bold">
                            Contact Us <br>
                            ${data?.data?.pricing[2].plan}
                            </div>
                        </div>

                        <div class="flex flex-wrap mt-5 gap-5">
                        
                            <div class="flex-1">
                                 <h2 class="card-title font-bold text-2xl mb-5">Features </h2>
                               <p>1. ${data?.data?.features["1"]?.feature_name}</p>
                               <p>2. ${data?.data?.features["2"]?.feature_name}</p>
                               <p>3. ${data?.data?.features["3"]?.feature_name}</p>
                            </div>

                            <div class="flex-1">
                                 <h2 class="card-title font-bold text-2xl mb-5">Integrations </h2>
                               <p>
                               1. ${data?.data?.integrations[0]} <br>
                               2. ${data?.data?.integrations[1]}<br>
                               3. ${data?.data?.integrations[2]}
                               </p>
                            </div>
                        </div>
                    </div>

                    <div class="flex-1 border-2 rounded-2xl">
                        <div class="p-5 h-1/2">
                            <img class="rounded-2xl mb-5" src="${data?.data?.image_link}" alt="${data?.data?.tool_name}">
                        </div>

                        <div class="p-10">
                            <h1 class="text-center text-2xl font-bold mb-5">${data?.data?.input_output_examples[0].input}</h1>
                            <p class="text-center">${data?.data?.input_output_examples[0].output}</p>
                        </div>
                    </div>
                 </div>
            </div>
         `;

    show_details_modal.showModal();
}

loadData();