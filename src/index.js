// Code here

	function fetchBeer()
	{
		fetch("http://localhost:3000/beers")
		.then((resp) => resp.json())
		.then((json) => beerList(json))
		.catch(function(error)
		{
			console.log(error);
		});
	}

	function beerList(beers)
	{
		beers.map(function (beer)
		{
			const beerList = document.getElementById('beer-list');
			const beerEntry = document.createDocumentFragment();
			let li = document.createElement('li');

			link = document.createElement('a');
			link.setAttribute("id", `${beer.id}`);
			link.textContent = beer.name;

			//li.innerHTML = `<a id = "${beer.id}">${beer.name}</a>`;

			li.appendChild(link);
			beerEntry.appendChild(li);
			beerList.appendChild(beerEntry);

			beerID = document.getElementById(`${beer.id}`);

			beerID.addEventListener('click', function(event)
			{
				event.preventDefault();
				const beerName = document.getElementById('beer-name');
				beerName.textContent = beer.name;
				const beerImage = document.getElementById('beer-image');

				if (beerImage.hasAttribute("src") && beerImage.hasAttribute("alt"))
				{
					beerImage.removeAttribute("src");
					beerImage.setAttribute("src", `${beer.image_url}`);
					beerImage.removeAttribute("alt");
					beerImage.setAttribute("alt", `${beer.name}`);
				}
				else
				{
					beerImage.removeAttribute("src");
					beerImage.setAttribute("src", `${beer.image_url}`);
					beerImage.removeAttribute("alt");
					beerImage.setAttribute("alt", `${beer.name}`);
				}
				const beerDescription = document.getElementById('beer-description');
				beerDescription.textContent = beer.description;

				const reviewList = document.getElementById('review-list');

				if (reviewList.hasChildNodes())
				{
					listItems = reviewList.childElementCount-1;

					for (node = 0 ; node <= listItems; node++)
					{
						reviewList.removeChild(reviewList.children[node]);
					}

					beer.reviews.forEach((entry, index) =>
					{
						let li2 = document.createElement('li');
						li2.textContent = entry;
						reviewList.appendChild(li2);
						event.preventDefault();
					})
				}
				else
				{
					beer.reviews.forEach((entry2, index2) =>
					{
						let li3 = document.createElement('li');
						li3.textContent = entry2;
						reviewList.appendChild(li3);
						event.preventDefault();
					})
				}

				const descriptionForm = document.getElementById('description-form');

				descriptionForm.addEventListener('submit', function(event)
				{
					event.preventDefault();
					const newDescription = document.getElementById('description');

					descriptionContent = newDescription.value;

					const editDescription = {description: descriptionContent};

					const requestContent =
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
						},
						body: JSON.stringify(editDescription),
					};

					fetch(`http://localhost:3000/beers/${beer.id}`, requestContent)
					.then((resp) => resp.json())
					.then((json) => console.log(json))
					.catch(function (error)
					{
						alert(`Error ${error.message}`);
						console.log(error.message);
					});
				});
				const reviewForm = document.getElementById('review-form');

				reviewForm.addEventListener('submit', function(event)
				{
					const newReview = document.getElementById('review');

					reviewContent = newReview.value;

					beer.reviews.push(reviewContent);

					updatedReviews = beer.reviews;

					const editReview = {reviews: updatedReviews};

					const requestContent2 =
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
						},
						body: JSON.stringify(editReview),
					};

					fetch(`http://localhost:3000/beers/${beer.id}`, requestContent2)
					.then((resp) => resp.json())
					.then((json) => console.log(json))
					.catch(function (error)
					{
						alert(`Error ${error.message}`);
						console.log(error.message);
					});
				});
			});
		});
	}

	document.addEventListener('DOMContentLoaded', function(event)
	{
		fetchBeer();
		event.preventDefault();

	});