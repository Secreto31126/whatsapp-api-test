<script lang="ts">
	import WhatsAppTester from '$lib/tester';

	let token: string;
	let from: string;
	let to: string;

	$: tester = new WhatsAppTester(token, from, to);
</script>

<form on:submit|preventDefault>
	<div class="inputs">
		<input type="text" id="token" bind:value={token} placeholder="Token" required />
		<input type="number" id="from" bind:value={from} placeholder="From (phoneID)" required />
		<input type="number" id="to" bind:value={to} placeholder="To" required />
	</div>

	<div class="buttons">
		<button on:click={() => tester.text()}>Send Text</button>
		<button on:click={() => tester.location()}>Send Location</button>
		<button on:click={() => tester.audio()}>Send Audio</button>
		<button on:click={() => tester.document()}>Send Document</button>
		<button on:click={() => tester.image()}>Send Image</button>
		<button on:click={() => tester.imageWithCaption()}>Send Image with Caption</button>
		<button on:click={() => tester.sticker()}>Send Sticker</button>
		<button on:click={() => tester.video()}>Send Video</button>
		<button on:click={() => tester.buttons()}>Send Buttons</button>
		<button on:click={() => tester.buttonsWithTextHeader()}>Send Buttons with Text Header</button>
		<button on:click={() => tester.buttonsWithImageHeader()}>Send Buttons with Image Header</button>
		<button on:click={() => tester.list()}>Send List</button>
		<button on:click={() => tester.listSections()}>Send List with Sections</button>
		<button on:click={() => tester.contact()}>Send Contact</button>
		<button on:click={() => tester.multiContact()}>Send Multi Contact</button>
	</div>
</form>

<style>
	.inputs {
		display: flex;
		justify-content: space-evenly;
		height: 5vh;
	}

	.inputs input {
		height: 90%;
	}

	.buttons {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		height: 90vh;
	}

	.buttons button {
		width: 15rem;
		margin: 0.5rem;
	}
</style>
