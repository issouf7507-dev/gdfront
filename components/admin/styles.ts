// Classes partagées de l'admin. Fichier sans "use client" : utilisable
// aussi bien dans les composants serveur que dans les composants client.

export const cardClass = "rounded-3xl border border-neutral-200/70 bg-white";

export const inputClass =
  "w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-950 transition-colors placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-950 focus:outline-none focus:ring-4 focus:ring-brand/15";

const button =
  "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60";

export const buttonPrimaryClass = `${button} bg-neutral-950 text-white hover:bg-brand`;
export const buttonSecondaryClass = `${button} border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-950 hover:text-neutral-950`;
export const buttonDangerClass = `${button} border border-red-200 bg-white text-red-700 hover:bg-red-50`;

export const iconButtonClass =
  "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-30";

export const tableHeadClass = "text-xs font-medium uppercase tracking-[0.12em] text-neutral-400";
