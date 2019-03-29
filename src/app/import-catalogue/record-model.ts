interface RecordModel {
    records: MarcRecord[]
}
interface MarcRecord {
    leader: string
    controlFields: ControlField[]
    dataFields: DataField[]
}
interface ControlField {
    tag: string
    data: string
}
interface DataField {
    tag: string
    indicator1: string
    indicator2: string
    subfields: SubField[]
}
interface SubField {
    identifier: string
    data: string    
}
