export interface CodeListValue {
    type: string,
    value: string
}

const SERVICE_CATEGORY_VALUES = [
    "AIRCON_SERVICE",
    "ELECTRICIAN_SERVICE",
    "PLUMBING_SERVICE"
] as const;

const AIRCON_SERVICE_VALUES = [
    "AIRCON_STANDARD_CLEANING",
    "AIRCON_CHEMICAL_WASH",
    "AIRCON_CHEMICAL_OVERHAUL",
    "AIRCON_INSTALLATION",
    "AIRCON_GAS"
]

const ELECTRICIAN_SERVICE_VALUES = [
    "ELECTRICAL_INSTALLATION_WIRING_REPLACEMENT",
    "ELECTRICAL_ISSUES_AND_APPLIANCES_REPAIR",
    "ELECTRICAL_UPGRADES"
] as const;

const PLUMBING_SERVICE_VALUES = [
    "PLUMBING_FIXTURES_INSTALLATION",
    "PLUMPING_VALVES_WATER_HEATER",
    "PLUMBING_FIXTURES_REPAIR_MAINTENANCE",
    "PLUMBING_CLOGGED",
    "PLUMBING_REPLACEMENT_REPAIR"
] as const;

const CASE_STATUS_VALUES = [
    "PENDING",
    "PAYMENT_PENDING",
    "IN_PROGRESS",
    "COMPLETED",
    "FAILED",
    "DISPUTE"
] as const;

export type SERVICE_CATEGORY = typeof SERVICE_CATEGORY_VALUES[number];
export type AIRCON_SERVICE = typeof AIRCON_SERVICE_VALUES[number];
export type ELECTRICIAN_SERVICE = typeof ELECTRICIAN_SERVICE_VALUES[number];
export type PLUMBING_SERVICE = typeof PLUMBING_SERVICE_VALUES[number];
export type CASE_STATUS = typeof CASE_STATUS_VALUES[number];

export const CodeList: CodeListValue[] = [
    ...SERVICE_CATEGORY_VALUES.map(val => ({
        type: "SERVICE_CATEGORY",
        value: val
    })),
    ...AIRCON_SERVICE_VALUES.map(val => ({
        type: "AIRCON_SERVICE",
        value: val
    })),
    ...ELECTRICIAN_SERVICE_VALUES.map(val => ({
        type: "ELECTRICIAN_SERVICE",
        value: val
    })),
    ...PLUMBING_SERVICE_VALUES.map(val => ({
        type: "PLUMBING_SERVICE",
        value: val
    })),
    ...CASE_STATUS_VALUES.map(val => ({
        type: "CASE_STATUS",
        value: val
    }))
]
