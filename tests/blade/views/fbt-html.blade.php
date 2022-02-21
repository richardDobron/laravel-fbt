@fbtTransform

<table role="presentation" class="uiInfoTable">
    <tbody>
    <tr>
        <th class="label">
            <label for="password_old"><fbt desc="Field for current password">Current</fbt></label>
        </th>
        <td class="data"><input type="password" class="inputtext" name="password_old" id="password_old"></td>
    </tr>
    <tr>
        <th class="label">
            <label for="password_new"><fbt desc="Field for new password">New</fbt></label>
        </th>
        <td class="data">
            <input type="password" class="inputtext" name="password_new" id="password_new" autocomplete="off">
        </td>
    </tr>
    <tr>
        <th class="label">
            <label for="password_confirm"><fbt desc="Label: input for a re-typing of new password">Re-type new</fbt></label>
        </th>
        <td class="data">
            <input type="password" class="inputtext" name="password_confirm" id="password_confirm" autocomplete="off">
        </td>
    </tr>
    <tr>
        <td colspan="2"><a href="/user/change-password"><fbt desc="Lost password link text">Forgot your password?</fbt></a></td>
    </tr>
    </tbody>
</table>

<p>
    <fbt desc="Table Desc">
        Click <fbt:enum enum-range="{{ json_encode(['here', 'there', 'anywhere']) }}" value="here" />
        to see
        <fbt:plural name="count" showCount="yes" count="2">thing</fbt:plural>.
    </fbt>
</p>

@endFbtTransform
