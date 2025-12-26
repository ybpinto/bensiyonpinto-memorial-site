/**
 * Condolence Modal and Dynamic Loading
 * Loads condolence messages from JSON and handles image modal
 */

// Function to open image in modal
function showCondolenceImage(imageSrc, altText) {
	const modal = document.getElementById('condolence-image-modal');
	const img = modal.querySelector('img');
	img.src = imageSrc;
	img.alt = altText;
	modal.showModal();
}

// Close modal when clicking outside the image
document.getElementById('condolence-image-modal')?.addEventListener('click', function(e) {
	if (e.target === this) {
		this.close();
	}
});

// Format date for display
function formatDate(dateString) {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
	const div = document.createElement('div');
	div.textContent = text;
	return div.innerHTML;
}

// Convert newlines to <br> tags
function nl2br(text) {
	return escapeHtml(text).replace(/\r\n|\n|\r/g, '<br>');
}

// Toggle expand/collapse for condolence messages
function toggleExpand(button) {
	const card = button.closest('.condolence-card');
	const message = card.querySelector('.condolence-message');
	const isExpanded = message.classList.contains('expanded');

	if (isExpanded) {
		message.classList.remove('expanded');
		message.classList.add('truncated');
		button.textContent = 'Read more';
	} else {
		message.classList.remove('truncated');
		message.classList.add('expanded');
		button.textContent = 'Read less';
	}
}

// Check if text needs truncation (rough estimate based on character count)
function needsTruncation(text) {
	// Approximately 4 lines worth of text (depends on container width)
	return text.length > 300;
}

// Load condolences from JSON
async function loadCondolences() {
	try {
		const response = await fetch('content/condolences.json');
		if (!response.ok) {
			throw new Error('Failed to load condolences');
		}
		const condolences = await response.json();

		const container = document.querySelector('.condolences-container');
		if (!container) return;

		// Sort by date (newest first)
		condolences.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

		condolences.forEach((condolence) => {
			const card = document.createElement('div');
			card.className = 'condolence-card';

			let imageHTML = '';
			if (condolence.image) {
				const imagePath = `images/condolences/${condolence.image}`;
				const safeName = escapeHtml(condolence.name);
				imageHTML = `
					<div class="condolence-image">
						<img src="${imagePath}"
							 loading="lazy"
							 alt="Shared memory from ${safeName}"
							 onclick="showCondolenceImage('${imagePath}', 'Memory from ${safeName}')">
					</div>
				`;
			}

			const isTruncated = needsTruncation(condolence.message);
			const messageClass = isTruncated ? 'condolence-message truncated' : 'condolence-message';
			const expandButton = isTruncated ? '<a href="javascript:void(0)" class="expand-toggle" onclick="toggleExpand(this)">Read more</a>' : '';

			card.innerHTML = `
				<div class="condolence-header">
					<strong>${escapeHtml(condolence.name)}</strong>
					<span class="date">${formatDate(condolence.created_date)}</span>
				</div>
				<p class="${messageClass}">${nl2br(condolence.message)}</p>
				${expandButton}
				${imageHTML}
			`;

			container.appendChild(card);
		});
	} catch (error) {
		console.error('Error loading condolences:', error);
		const container = document.querySelector('.condolences-container');
		if (container) {
			container.innerHTML = '<p>Unable to load messages. Please try again later.</p>';
		}
	}
}

// Load condolences when page loads
document.addEventListener('DOMContentLoaded', loadCondolences);
