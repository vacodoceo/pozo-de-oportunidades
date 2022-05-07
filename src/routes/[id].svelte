<script lang="ts">
	import { goto } from '$app/navigation';

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

	export let opportunity: Opportunity;
</script>

<div class="flex-grow w-full flex max-w-5xl mx-auto xl:px-8">
	<div class="bg-white lg:min-w-0 flex flex-col flex-1 border border-gray-200 border-t-0">
		<div class="px-4 py-5 sm:px-6">
			<h2 id="applicant-information-title" class="text-lg leading-6 font-medium text-gray-900">
				{opportunity.title}
			</h2>
			<p class="mt-1 max-w-2xl text-sm text-gray-500">Detalle de la oportunidad</p>
		</div>
		<div class="border-t border-gray-200 px-4 py-5 sm:px-6">
			<dl class="grid gap-x-4 gap-y-8 grid-cols-2 sm:grid-cols-3">
				<div class="sm:col-span-1">
					<dt class="text-sm font-medium text-gray-500">Surgió en/con</dt>
					<dd class="mt-1 text-sm text-gray-900">{opportunity.createdBy}</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm font-medium text-gray-500">Encargado/a</dt>
					<dd class="mt-1 text-sm text-gray-900">{opportunity.owner}</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm font-medium text-gray-500">Cliente</dt>
					<dd class="mt-1 text-sm text-gray-900">{opportunity.client}</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm font-medium text-gray-500">Estado</dt>
					<dd class="mt-1 text-sm text-gray-900">{opportunity.status}</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm font-medium text-gray-500">Prioridad</dt>
					<dd class="mt-1 text-sm text-gray-900">{opportunity.priority}</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm font-medium text-gray-500">Dificultad</dt>
					<dd class="mt-1 text-sm text-gray-900">{opportunity.difficulty}</dd>
				</div>
				<div class="col-span-3">
					<dt class="text-sm font-medium text-gray-500">Descripción</dt>
					<dd class="mt-1 text-sm text-gray-900">
						{opportunity.description}
					</dd>
				</div>
			</dl>
		</div>
		<div class="flex items-end flex-1 justify-center mb-4 mx-4 sm:mx-6">
			<button
				class="flex-1 bg-white py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
				on:click={() => goto('/')}>Volver</button
			>
		</div>
	</div>
</div>
