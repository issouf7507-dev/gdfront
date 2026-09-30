// Champ piège anti-spam : caché aux humains (et aux lecteurs d'écran),
// les robots qui remplissent tous les champs se trahissent.
export function HoneypotField() {
    return (
        <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
            <label>
                Ne pas remplir
                <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
            </label>
        </div>
    );
}

export function honeypotValue(form: EventTarget): string | undefined {
    if (!(form instanceof HTMLFormElement)) return undefined;
    const value = new FormData(form).get("website");
    return typeof value === "string" && value ? value : undefined;
}
