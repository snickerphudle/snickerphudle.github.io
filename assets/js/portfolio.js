// Minimal placeholder for Phase 0
document.addEventListener('DOMContentLoaded', function() {
	// IntersectionObserver to reveal elements quickly
	var revealEls = document.querySelectorAll('.reveal');
	if ('IntersectionObserver' in window) {
		var io = new IntersectionObserver(function(entries, obs) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					obs.unobserve(entry.target);
					
					// Trigger name bounce animation when hero becomes visible
					if (entry.target.classList.contains('hero-grid')) {
						animateName();
					}
					
					// Trigger metrics counter when metrics section becomes visible
					if (entry.target.classList.contains('metrics-section')) {
						animateCounters();
					}
				}
			});
		}, { threshold: 0.15 });
		revealEls.forEach(function(el) { io.observe(el); });
	} else {
		revealEls.forEach(function(el) { el.classList.add('is-visible'); });
		animateName();
		animateCounters();
	}
	
	// Animate name letters one by one
	function animateName() {
		var nameEl = document.getElementById('bounce-name');
		if (!nameEl) return;
		
		var text = nameEl.textContent;
		var letters = text.split('');
		var html = '';
		
		letters.forEach(function(letter, index) {
			if (letter === ' ') {
				html += '<span class="space">&nbsp;</span>';
			} else {
				html += '<span class="letter" style="animation-delay: ' + (index * 0.1) + 's">' + letter + '</span>';
			}
		});
		
		nameEl.innerHTML = html;
	}
	
	// Animate counter numbers
	function animateCounters() {
		var counters = document.querySelectorAll('.metric-number');
		
		counters.forEach(function(counter) {
			var target = parseInt(counter.getAttribute('data-target'));
			var duration = 2000; // 2 seconds
			var start = performance.now();
			var hasTriggeredConfetti = false;
			
			function updateCounter(currentTime) {
				var elapsed = currentTime - start;
				var progress = Math.min(elapsed / duration, 1);
				
				// Easing function for smooth animation
				var easeOutQuart = 1 - Math.pow(1 - progress, 4);
				var current = Math.floor(target * easeOutQuart);
				
				// Format number with commas
				counter.textContent = current.toLocaleString();
				
				// Trigger confetti when reaching the target
				if (progress >= 0.95 && !hasTriggeredConfetti) {
					hasTriggeredConfetti = true;
					createConfetti(counter);
				}
				
				if (progress < 1) {
					requestAnimationFrame(updateCounter);
				} else {
					counter.textContent = target.toLocaleString();
				}
			}
			
			requestAnimationFrame(updateCounter);
		});
	}
	
	// Create confetti effect
	function createConfetti(element) {
		var metric = element.closest('.metric');
		var colors = ['#2ebaae', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#a8e6cf', '#ffd93d', '#ff8a80'];
		
		// Create 8 confetti pieces for a more dramatic pop
		for (var i = 0; i < 8; i++) {
			var confetti = document.createElement('div');
			confetti.className = 'confetti';
			
			// Calculate random direction for pop effect
			var angle = (i * 45) + (Math.random() * 20 - 10); // 45 degrees apart with some randomness
			var distance = 50 + Math.random() * 30; // Random distance between 50-80px (shorter for faster feel)
			var radians = angle * Math.PI / 180;
			var popX = Math.cos(radians) * distance;
			var popY = Math.sin(radians) * distance;
			
			confetti.style.setProperty('--pop-x', popX + 'px');
			confetti.style.setProperty('--pop-y', popY + 'px');
			confetti.style.background = colors[i];
			confetti.style.animationDelay = (i * 0.01) + 's';
			
			metric.appendChild(confetti);
			
			// Remove confetti after animation
			setTimeout(function() {
				if (confetti.parentNode) {
					confetti.parentNode.removeChild(confetti);
				}
			}, 600);
		}
	}
});

