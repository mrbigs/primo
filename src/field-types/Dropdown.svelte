<script>
  export let field
  
</script>

<label for="cars">Choose a car:</label>

<select name="cars" id="cars" bind:value={field.value}>
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>