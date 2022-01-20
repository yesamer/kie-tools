export var DMNSimpleType;
(function (DMNSimpleType) {
    DMNSimpleType["NUMBER"] = "number";
    DMNSimpleType["STRING"] = "string";
    DMNSimpleType["BOOLEAN"] = "boolean";
    DMNSimpleType["DURATION_DAYS_TIME"] = "days and time duration";
    DMNSimpleType["DURATION_YEAR_MONTH"] = "years and months duration";
    DMNSimpleType["TIME"] = "time";
    DMNSimpleType["DATE_TIME"] = "date and time";
    DMNSimpleType["ANY"] = "Any";
    DMNSimpleType["DATE"] = "date";
    DMNSimpleType["CONTEXT"] = "context";
    DMNSimpleType["UNDEFINED"] = "<Undefined>";
})(DMNSimpleType || (DMNSimpleType = {}));
export const JAVA_TO_DMN_MAP = new Map([
    ["AtomicInteger", DMNSimpleType.NUMBER],
    ["AtomicLong", DMNSimpleType.NUMBER],
    ["BigDecimal", DMNSimpleType.NUMBER],
    ["BigInteger", DMNSimpleType.NUMBER],
    ["Byte", DMNSimpleType.NUMBER],
    ["byte", DMNSimpleType.NUMBER],
    ["Double", DMNSimpleType.NUMBER],
    ["double", DMNSimpleType.NUMBER],
    ["DoubleAccumulator", DMNSimpleType.NUMBER],
    ["DoubleAdder", DMNSimpleType.NUMBER],
    ["Float", DMNSimpleType.NUMBER],
    ["float", DMNSimpleType.NUMBER],
    ["Integer", DMNSimpleType.NUMBER],
    ["int", DMNSimpleType.NUMBER],
    ["Long", DMNSimpleType.NUMBER],
    ["long", DMNSimpleType.NUMBER],
    ["LongAccumulator", DMNSimpleType.NUMBER],
    ["LongAdder", DMNSimpleType.NUMBER],
    ["Number", DMNSimpleType.NUMBER],
    ["Short", DMNSimpleType.NUMBER],
    ["short", DMNSimpleType.NUMBER],
    ["Striped64", DMNSimpleType.NUMBER],
    ["Character", DMNSimpleType.STRING],
    ["char", DMNSimpleType.STRING],
    ["String", DMNSimpleType.STRING],
    ["LocalDate", DMNSimpleType.DATE],
    ["LocalTime", DMNSimpleType.TIME],
    ["OffsetTime", DMNSimpleType.TIME],
    ["ZonedDateTime", DMNSimpleType.DATE_TIME],
    ["OffsetDateTime", DMNSimpleType.DATE_TIME],
    ["LocalDateTime", DMNSimpleType.DATE_TIME],
    ["Date", DMNSimpleType.DATE_TIME],
    ["Duration", DMNSimpleType.DURATION_DAYS_TIME],
    ["ChronoPeriod", DMNSimpleType.DURATION_DAYS_TIME],
    ["Boolean", DMNSimpleType.BOOLEAN],
    ["Map", DMNSimpleType.CONTEXT],
    ["LinkedHashMap", DMNSimpleType.CONTEXT],
    ["HashMap", DMNSimpleType.CONTEXT],
    ["TreeMap", DMNSimpleType.CONTEXT],
]);
//# sourceMappingURL=DMNSimpleType.js.map