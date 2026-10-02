@fbt('Available Locations: ' . \fbt\fbt::list('locations', $locations) . '.', 'Lists')
@fbtTransform
<fbt desc="Lists">
  Available Locations:
  <fbt:list
    name="locations"
    items="{{ json_encode($locations) }}"
    conjunction="or"
  />.
</fbt>
@endFbtTransform
