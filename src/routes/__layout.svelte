<script>
	import '../app.css';
</script>

<svelte:head>
	<title>Pozo de oportunidades</title>
</svelte:head>

<div class="relative min-h-full flex flex-col">
	<!-- Navbar -->
	<nav class="flex-shrink-0 bg-primary">
		<div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
			<div class="relative flex items-center justify-between h-16">
				<!-- Logo section -->
				<div class="flex items-center px-2 lg:px-0 xl:w-64">
					<!-- <div class="flex-shrink-0">
						<img class="h-8 w-auto" src="logo-mercator.png" alt="Logo Mercator" />
					</div> -->
				</div>

				<!-- Search section -->
				<div class="flex-1 flex justify-center">
					<div class="flex-shrink-0">
						<img class="h-8 w-auto" src="logo-mercator.png" alt="Logo Mercator" />
					</div>
					<!-- <h2 class="font-semibold text-lg tracking-wide text-white">Pozo de oportunidades</h2> -->
				</div>

				<!-- Links section -->
				<div class="hidden lg:block lg:w-80" />
			</div>
		</div>
	</nav>
	<slot />
</div>
