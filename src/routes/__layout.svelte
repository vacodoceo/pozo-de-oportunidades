<script>
	import '../app.css';

	import { browser } from '$app/env';
	import { navigating, page } from '$app/stores';
	import { webVitals } from '$lib/vitals';

	import { inject } from '@vercel/analytics';

	inject();

	const analyticsId = import.meta.env.VITE_VERCEL_ANALYTICS_ID;

	$: if (browser && analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});
	}
</script>

<svelte:head>
	<title>Pozo de oportunidades</title>
</svelte:head>

<div class="relative min-h-full flex flex-col bg-gray-50">
	<!-- Navbar -->
	<nav class="flex-shrink-0 bg-primary">
		<div class="max-w-7xl mx-auto px-2 sm:px-4">
			<div class="relative flex items-center justify-between h-16">
				<!-- Logo section -->
				<div class="flex-1 flex justify-center">
					<div class="flex-shrink-0">
						<img class="h-8 w-auto" src="logo-mercator.png" alt="Logo Mercator" />
					</div>
				</div>
			</div>
		</div>
	</nav>
	{#if !!$navigating}
		<div role="status" class="flex flex-1 justify-center items-center">
			<svg
				class="animate-spin  h-16 w-16 text-primary"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
			<span class="sr-only">Loading...</span>
		</div>
	{:else}
		<slot />
	{/if}

	<footer>
		<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
			<div class="py-4 sm:py-8 space-y-2 text-center text-sm text-gray-500">
				<span class="block">
					Si quieres subir oportunidades al Pozo, contáctate con
					<a
						href="https://wa.me/56948838946"
						rel="noopener noreferrer"
						target="_blank"
						class="hover:underline text-indigo-600 hover:text-indigo-800"
					>
						Kimberly Acosta
					</a>
				</span>

				<span class="block">
					Made with ❤️ by
					<a
						href="https://github.com/vacodoceo"
						rel="noopener noreferrer"
						target="_blank"
						class="hover:underline text-indigo-600 hover:text-indigo-800"
					>
						@vacodoceo
					</a>
				</span>
			</div>
		</div>
	</footer>
</div>
