<script lang="ts">
	import { DateTime, Settings } from 'luxon';

	Settings.defaultLocale = 'es-cl';

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
		phoneNumber: string;
		createdAt: string;
		fileUrl: string;
	};

	export let opportunity: Opportunity;
</script>

<div class="flex-grow w-full flex max-w-5xl mx-auto xl:px-8">
	<div class="bg-white lg:min-w-0 flex flex-col flex-1 border border-gray-200 border-t-0">
		<div class="px-4 py-5 sm:px-6">
			<h2 id="applicant-information-title" class="text-lg leading-6 font-bold text-gray-900">
				{opportunity.title}
			</h2>
			<p class="mt-1 max-w-2xl text-sm text-gray-600">Detalle de la oportunidad</p>
		</div>
		<div class="border-t border-gray-200 px-4 py-5 sm:px-6">
			<dl class="grid gap-x-4 gap-y-8 grid-cols-2 sm:grid-cols-3">
				<div class="sm:col-span-1">
					<dt class="text-sm font-bold text-gray-600">Surgió en/con</dt>
					<dd class="mt-1 text-sm text-gray-900">{opportunity.createdBy}</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm font-bold text-gray-600">Encargado/a</dt>
					<dd class="mt-1 text-sm text-gray-900">{opportunity.owner}</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm font-bold text-gray-600">Cliente</dt>
					<dd class="mt-1 text-sm text-gray-900">{opportunity.client}</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm font-bold text-gray-600">Estado</dt>
					<dd class="mt-1 text-sm text-gray-900">{opportunity.status}</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm font-bold text-gray-600">Prioridad</dt>
					<dd class="mt-1 text-sm text-gray-900">{opportunity.priority}</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm font-bold text-gray-600">Dificultad</dt>
					<dd class="mt-1 text-sm text-gray-900">{opportunity.difficulty}</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm font-bold text-gray-600">Fecha de creación</dt>
					<dd class="mt-1 text-sm text-gray-900">
						{DateTime.fromISO(opportunity.createdAt).toLocaleString()}
					</dd>
				</div>

				{#if opportunity.fileUrl}
					<div class="sm:col-span-2">
						<dt class="text-sm font-bold text-gray-600">Archivo adjunto</dt>
						<dd class="mt-1 text-sm text-gray-900">
							<a
								href={opportunity.fileUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="text-indigo-600 hover:text-indigo-900"
							>
								Ver archivo
							</a>
						</dd>
					</div>
				{/if}

				<div class="col-span-2 sm:col-span-3">
					<dt class="text-sm font-bold text-gray-600">Descripción</dt>
					<dd class="mt-1 text-sm text-gray-900 whitespace-pre-line">
						{opportunity.description}
					</dd>
				</div>
			</dl>
		</div>
		<div class="flex items-end flex-1 justify-center mb-4 mx-4 sm:mx-6 space-x-4 space-y-2">
			<a
				class="flex-1 flex justify-center bg-white py-2 px-4 border border-gray-300 rounded-md text-sm font-bold text-gray-700 hover:bg-gray-50"
				href="/"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5  w-5 mr-2 "
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
				</svg>

				Volver</a
			>
			<a
				class="flex flex-1 justify-center bg-whatsapp-green py-2 px-4 border rounded-md text-sm font-bold text-white hover:bg-green-400"
				href={`https://wa.me/${opportunity.phoneNumber}`}
				rel="noopener noreferrer"
				target="_blank"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 mr-2"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
					/>
				</svg>
				Contactar
			</a>
		</div>
	</div>
</div>
