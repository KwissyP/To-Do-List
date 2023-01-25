const code = document.querySelectorAll('.code');
const col = document.querySelectorAll('.col');

let draggedItem = null;

for (let i = 0; i < code.length; i++) {
	let item = code[i];

	item.addEventListener('dragstart', function () {
		draggedItem = item;
		setTimeout(function () {
			item.style.display = 'none';
		}, 0)
	});

	item.addEventListener('dragend', function () {
		setTimeout(function () {
			draggedItem.style.display = 'block';
			draggedItem = null;
		}, 0);
	})

	for (let j = 0; j < col.length; j ++) {
		let list = col[j];

		list.addEventListener('dragover', function (e) {
			e.preventDefault();
		});
		
		list.addEventListener('dragenter', function (e) {
			e.preventDefault();
		});

		list.addEventListener('drop', function (e) {
			console.log('drop');
			this.append(draggedItem);
		});
	}
}