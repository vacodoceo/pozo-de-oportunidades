<script lang="ts">
	import { onClickOutside } from '$lib/utils/on-click-outside';
	import { hasContext } from 'svelte';

	enum OpportunityStatus {
		Pending = 'Sin comenzar',
		InProcess = 'En proceso',
		Finished = 'Finalizado'
	}

	type Opportunity = {
		title: string;
		description: string;
		createdBy: string;
		owner: string;
		client: string;
		status: OpportunityStatus;
		priority: number;
		difficulty: number;
		stakeholders: string;
	};

	export let opportunities: Opportunity[];

	let sorting: Boolean = false;
	const activeSortClass = 'bg-gray-100 font-medium ';
	let prioritySort = 1;
	let difficultySort = 0;

	let filtering: Boolean = false;
	const activeFilterClass = 'font-medium';
	let activeFilters = new Set(['Finalizado', 'En proceso', 'Sin comenzar']);
	$: filteredSortedOpportunities = opportunities
		.filter((opportunity) => activeFilters.has(opportunity.status))
		.sort(
			(a, b) =>
				difficultySort * (a.difficulty - b.difficulty) + prioritySort * (a.priority - b.priority)
		)
		.reverse();
</script>

<div class="fixed top-0 left-0 w-1/2 h-full bg-white -z-10 hidden lg:block" aria-hidden="true" />
<div class="fixed top-0 right-0 w-1/2 h-full bg-gray-50 -z-10 hidden lg:block" aria-hidden="true" />
<!-- 3 column wrapper -->
<div class="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
	<!-- Projects List -->
	<div class="bg-white lg:min-w-0 lg:flex-1 border border-gray-200 border-t-0">
		<div
			class="pl-4 pr-6 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:border-t-0"
		>
			<div class="flex items-center space-x-4">
				<h1 class="flex-1 text-lg font-medium">Oportunidades</h1>

				<div
					class="relative"
					use:onClickOutside={() => {
						filtering = false;
					}}
				>
					<button
						type="button"
						class="w-full bg-white border border-gray-300 rounded-md shadow-sm p-2 sm:px-4 sm:py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
						id="filter-menu-button"
						aria-expanded="false"
						aria-haspopup="true"
						on:click={() => (filtering = !filtering)}
					>
						<!-- Heroicon name: solid/filter-ascending -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
							/>
						</svg>
						<span class="hidden sm:block sm:ml-3">Filtrar</span>
						<!-- Heroicon name: solid/chevron-down -->
						<svg
							class="ml-1  sm:ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
					<!-- Dropdown menu, show/hide based on menu state. -->
					{#if filtering}
						<div
							class="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="filter-menu-button"
							tabindex="-1"
						>
							<button
								class={`text-gray-700 block w-full px-4 text-left py-2 text-sm relative ${
									activeFilters.has('Finalizado') && activeFilterClass
								}`}
								role="menuitem"
								tabindex="-1"
								id="filter-menu-item-1"
								on:click={() => {
									activeFilters.has('Finalizado')
										? activeFilters.delete('Finalizado')
										: activeFilters.add('Finalizado');
									activeFilters = activeFilters;
								}}
								>Finalizado ({opportunities.filter(
									(opportunity) => opportunity.status === 'Finalizado'
								).length})
								{#if activeFilters.has('Finalizado')}
									<span
										class="text-primary absolute inset-y-0 right-0 flex items-center pr-4 -z-10"
									>
										<svg
											class="h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/>
										</svg>
									</span>
								{/if}
							</button>
							<button
								class={`text-gray-700 block w-full px-4 text-left py-2 text-sm relative ${
									activeFilters.has('En proceso') && activeFilterClass
								}`}
								role="menuitem"
								tabindex="-1"
								id="filter-menu-item-2"
								on:click={() => {
									activeFilters.has('En proceso')
										? activeFilters.delete('En proceso')
										: activeFilters.add('En proceso');
									activeFilters = activeFilters;
								}}
								>En proceso ({opportunities.filter(
									(opportunity) => opportunity.status === 'En proceso'
								).length})
								{#if activeFilters.has('En proceso')}
									<span
										class="text-primary absolute inset-y-0 right-0 flex items-center pr-4 -z-10"
									>
										<svg
											class="h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/>
										</svg>
									</span>
								{/if}
							</button>
							<button
								class={`text-gray-700 block w-full px-4 text-left py-2 text-sm relative ${
									activeFilters.has('Sin comenzar') && activeFilterClass
								}`}
								role="menuitem"
								tabindex="-1"
								id="filter-menu-item-3"
								on:click={() => {
									activeFilters.has('Sin comenzar')
										? activeFilters.delete('Sin comenzar')
										: activeFilters.add('Sin comenzar');
									activeFilters = activeFilters;
								}}
								>Sin comenzar ({opportunities.filter(
									(opportunity) => opportunity.status === 'Sin comenzar'
								).length})
								{#if activeFilters.has('Sin comenzar')}
									<span
										class="text-primary absolute inset-y-0 right-0 flex items-center pr-4 -z-10"
									>
										<svg
											class="h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/>
										</svg>
									</span>
								{/if}
							</button>
						</div>
					{/if}
				</div>

				<div
					class="relative"
					use:onClickOutside={() => {
						sorting = false;
					}}
				>
					<button
						type="button"
						class="w-full bg-white border border-gray-300 rounded-md shadow-sm p-2 sm:px-4 sm:py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
						id="sort-menu-button"
						aria-expanded="false"
						aria-haspopup="true"
						on:click={() => (sorting = !sorting)}
					>
						<!-- Heroicon name: solid/sort-ascending -->
						<svg
							class="h-5 w-5 text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"
							/>
						</svg>
						<span class="hidden sm:block sm:ml-3">Ordenar</span>
						<!-- Heroicon name: solid/chevron-down -->
						<svg
							class="ml-1  sm:ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
					<!-- Dropdown menu, show/hide based on menu state. -->
					{#if sorting}
						<div
							class="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="sort-menu-button"
							tabindex="-1"
						>
							<button
								class={`text-gray-700 block w-full px-4 text-left py-2 text-sm ${
									prioritySort === 1 && activeSortClass
								}`}
								on:click={() => {
									sorting = false;
									difficultySort = 0;
									prioritySort = 1;
								}}
								role="menuitem"
								tabindex="-1"
								id="sort-menu-item-1">Más prioritarios primero</button
							>
							<button
								class={`text-gray-700 block w-full px-4 text-left py-2 text-sm ${
									prioritySort === -1 && activeSortClass
								}`}
								on:click={() => {
									sorting = false;
									prioritySort = -1;
									difficultySort = 0;
								}}
								role="menuitem"
								tabindex="-1"
								id="sort-menu-item-2">Menos prioritarios primero</button
							>
							<button
								class={`text-gray-700 block w-full px-4 text-left py-2 text-sm ${
									difficultySort === 1 && activeSortClass
								}`}
								on:click={() => {
									sorting = false;
									difficultySort = 1;
									prioritySort = 0;
								}}
								role="menuitem"
								tabindex="-1"
								id="sort-menu-item-3">Más difíciles primero</button
							>
							<button
								class={`text-gray-700 block w-full px-4 text-left py-2 text-sm ${
									difficultySort === -1 && activeSortClass
								}`}
								on:click={() => {
									sorting = false;
									difficultySort = -1;
									prioritySort = 0;
								}}
								role="menuitem"
								tabindex="-1"
								id="sort-menu-item-4">Menos difíciles primero</button
							>
						</div>
					{/if}
				</div>
			</div>
		</div>
		<ul class="relative z-0 divide-y divide-gray-200 border-b border-gray-200">
			{#each filteredSortedOpportunities as opportunity, index (opportunity.title)}
				<li class="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6">
					<div class="flex items-center justify-between space-x-4 md:space-x-12">
						<div class="min-w-0 space-y-3">
							<div class="flex items-center space-x-3">
								<span
									class={'h-4 w-4 rounded-full flex items-center justify-center ' +
										(opportunity.status === OpportunityStatus.Finished
											? 'bg-green-50'
											: opportunity.status === OpportunityStatus.InProcess
											? 'bg-yellow-50'
											: 'bg-red-50')}
									aria-hidden="true"
								>
									<span
										class={'h-2 w-2 rounded-full ' +
											(opportunity.status === OpportunityStatus.Finished
												? 'bg-green-400'
												: opportunity.status === OpportunityStatus.InProcess
												? 'bg-yellow-400'
												: 'bg-red-400')}
									/>
								</span>

								<span class="block">
									<h2 class="text-sm font-medium">
										<a href={`/${index}`}>
											<span class="absolute inset-0" aria-hidden="true" />
											{opportunity.title} <span class="sr-only">Running</span>
										</a>
									</h2>
								</span>
							</div>
							<p class="text-sm text-gray-500 text-justify line-clamp-3">
								{opportunity.description}
							</p>
							<p class="flex space-x-2 items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4 flex-shrink-0 text-gray-700"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/>
								</svg>
								<span class="relative text-sm text-gray-500 hover:text-gray-900">
									{opportunity.client}
								</span>
							</p>
						</div>
						<div class="md:hidden">
							<svg
								class="h-5 w-5 text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<!-- Repo meta info -->
						<div class="hidden md:flex flex-col h-full flex-shrink-0 items-end space-y-3">
							<p class="flex text-xs items-baseline space-x-1 text-gray-500">
								<span
									class={`text-sm ${
										opportunity.status === OpportunityStatus.Finished
											? 'text-green-600'
											: opportunity.status === OpportunityStatus.InProcess
											? 'text-yellow-600'
											: 'text-red-600'
									}`}>{opportunity.status}</span
								>
							</p>
							<p class="flex text-gray-500 text-sm space-x-2">
								<span>Prioridad: {opportunity.priority}</span>
								<span aria-hidden="true">&middot;</span>
								<span>Dificultad: {opportunity.difficulty}</span>
							</p>
						</div>
					</div>
				</li>
			{/each}

			<!-- More projects... -->
		</ul>
	</div>
</div>
