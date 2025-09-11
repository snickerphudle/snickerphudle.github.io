// Minimal placeholder for Phase 0
document.addEventListener('DOMContentLoaded', function() {
		// Small delay to ensure page is fully loaded before starting animations
		setTimeout(function() {
			// IntersectionObserver to reveal elements quickly
			var revealEls = document.querySelectorAll('.reveal');
		if ('IntersectionObserver' in window) {
			var io = new IntersectionObserver(function(entries, obs) {
				entries.forEach(function(entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						obs.unobserve(entry.target);
						
						// Trigger name bounce animation when hero becomes visible
						if (entry.target.classList.contains('hero')) {
							animateName();
							animateCounters();
						}
						
						// Start carousel animations when bio section becomes visible
						if (entry.target.classList.contains('bio-section')) {
							startCarousels();
						}
						
						// Start brand bubbles animation when brands section becomes visible
						if (entry.target.classList.contains('brands-section')) {
							startBrandBubbles();
						}
						
		// Initialize video carousel when video showcase section becomes visible
		if (entry.target.classList.contains('video-showcase-section')) {
			initVideoCarousel();
			initVideoPlayback();
		}
					}
				});
			}, { threshold: 0.15 });
			revealEls.forEach(function(el) { io.observe(el); });
		} else {
			// Fallback for browsers without IntersectionObserver
			// Just make elements visible without triggering animations immediately
			revealEls.forEach(function(el) { el.classList.add('is-visible'); });
		}
		}, 100); // Small delay to ensure page is loaded
	
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
	
	// Start carousel animations
	function startCarousels() {
		// Carousels are already animated via CSS, but we can add any JS enhancements here
		// For now, they'll start automatically when the section becomes visible
		console.log('Carousels started');
	}
	
	// Start brand bubbles animation
	function startBrandBubbles() {
		// Brand bubbles are already animated via CSS, but we can add any JS enhancements here
		// For now, they'll start automatically when the section becomes visible
		console.log('Brand bubbles started');
	}
	
	// Initialize video carousel
	function initVideoCarousel() {
		var carousel = document.querySelector('.video-carousel');
		var track = document.querySelector('.video-track');
		var prevBtn = document.querySelector('.prev-btn');
		var nextBtn = document.querySelector('.next-btn');
		var videoItems = document.querySelectorAll('.video-item');
		
		if (!carousel || !track || !prevBtn || !nextBtn) return;
		
		var currentIndex = 0;
		var itemsPerView = window.innerWidth <= 480 ? 1 : window.innerWidth <= 980 ? 2 : 3;
		var totalItems = videoItems.length;
		var maxIndex = Math.max(0, totalItems - itemsPerView);
		
		function updateCarousel() {
			var translateX = -currentIndex * (100 / itemsPerView);
			track.style.transform = 'translateX(' + translateX + '%)';
			
			// Update button states
			prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
			nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
		}
		
		function nextSlide() {
			if (currentIndex < maxIndex) {
				currentIndex++;
				updateCarousel();
			}
		}
		
		function prevSlide() {
			if (currentIndex > 0) {
				currentIndex--;
				updateCarousel();
			}
		}
		
		// Event listeners
		nextBtn.addEventListener('click', nextSlide);
		prevBtn.addEventListener('click', prevSlide);
		
		// Handle window resize
		window.addEventListener('resize', function() {
			itemsPerView = window.innerWidth <= 480 ? 1 : window.innerWidth <= 980 ? 2 : 3;
			maxIndex = Math.max(0, totalItems - itemsPerView);
			if (currentIndex > maxIndex) {
				currentIndex = maxIndex;
			}
			updateCarousel();
		});
		
		// Initialize
		updateCarousel();
		
		console.log('Video carousel initialized');
	}

	// Initialize video playback functionality
	function initVideoPlayback() {
		var videoThumbnails = document.querySelectorAll('.video-thumbnail');
		
		videoThumbnails.forEach(function(thumbnail) {
			var video = thumbnail.querySelector('video');
			var playButton = thumbnail.querySelector('.play-button');
			
			if (video && playButton) {
				// Click to play/pause
				thumbnail.addEventListener('click', function(e) {
					e.preventDefault();
					
					if (video.paused) {
						video.play();
						playButton.style.display = 'none';
					} else {
						video.pause();
						playButton.style.display = 'flex';
					}
				});
				
				// Show play button when video ends
				video.addEventListener('ended', function() {
					playButton.style.display = 'flex';
				});
				
				// Pause other videos when one starts playing
				video.addEventListener('play', function() {
					videoThumbnails.forEach(function(otherThumbnail) {
						var otherVideo = otherThumbnail.querySelector('video');
						if (otherVideo && otherVideo !== video && !otherVideo.paused) {
							otherVideo.pause();
							var otherPlayButton = otherThumbnail.querySelector('.play-button');
							if (otherPlayButton) {
								otherPlayButton.style.display = 'flex';
							}
						}
					});
				});
			}
		});
		
		console.log('Video playback initialized');
	}
});

