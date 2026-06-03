/**
 * 1C:Enterprise metadata buckets and mappings
 */

import type { MetadataBucket } from '@/types/onec'
import { OnecDirName, OnecNodeType } from '@/types/enums/onec'

export const ONEC_METADATA_BUCKETS: MetadataBucket[] = [
  { dirName: OnecDirName.Catalogs, nodeType: OnecNodeType.Catalog },
  { dirName: OnecDirName.Documents, nodeType: OnecNodeType.Document },
  { dirName: OnecDirName.Enums, nodeType: OnecNodeType.Enum },
  { dirName: OnecDirName.Reports, nodeType: OnecNodeType.Report },
  { dirName: OnecDirName.CommonModules, nodeType: OnecNodeType.CommonModule },
  { dirName: OnecDirName.InformationRegisters, nodeType: OnecNodeType.InformationRegister },
  { dirName: OnecDirName.AccumulationRegisters, nodeType: OnecNodeType.AccumulationRegister },
  { dirName: OnecDirName.CalculationRegisters, nodeType: OnecNodeType.CalculationRegister },
  { dirName: OnecDirName.BusinessProcesses, nodeType: OnecNodeType.BusinessProcess },
  { dirName: OnecDirName.Tasks, nodeType: OnecNodeType.Task },
  { dirName: OnecDirName.Roles, nodeType: OnecNodeType.Role },
  { dirName: OnecDirName.Subsystems, nodeType: OnecNodeType.Subsystem },
  { dirName: OnecDirName.Constants, nodeType: OnecNodeType.Constant },
  { dirName: OnecDirName.DataProcessors, nodeType: OnecNodeType.DataProcessor },
  { dirName: OnecDirName.CommonForms, nodeType: OnecNodeType.CommonForm },
  { dirName: OnecDirName.HTTPServices, nodeType: OnecNodeType.HTTPService },
  { dirName: OnecDirName.WebServices, nodeType: OnecNodeType.WebService },
  { dirName: OnecDirName.WSReferences, nodeType: OnecNodeType.WSReference },
  { dirName: OnecDirName.Languages, nodeType: OnecNodeType.Language },
  { dirName: OnecDirName.ChartsOfCalculationTypes, nodeType: OnecNodeType.ChartOfCalculationTypes },
  { dirName: OnecDirName.ChartsOfCharacteristicTypes, nodeType: OnecNodeType.ChartOfCharacteristicTypes },
  { dirName: OnecDirName.DocumentJournals, nodeType: OnecNodeType.DocumentJournal },
  { dirName: OnecDirName.DocumentNumerators, nodeType: OnecNodeType.DocumentNumerator },
  { dirName: OnecDirName.ExchangePlans, nodeType: OnecNodeType.ExchangePlan },
  { dirName: OnecDirName.DefinedTypes, nodeType: OnecNodeType.DefinedType },
  { dirName: OnecDirName.FilterCriteria, nodeType: OnecNodeType.FilterCriteria },
  { dirName: OnecDirName.EventSubscriptions, nodeType: OnecNodeType.EventSubscription },
  { dirName: OnecDirName.FunctionalOptions, nodeType: OnecNodeType.FunctionalOption },
  { dirName: OnecDirName.FunctionalOptionsParameters, nodeType: OnecNodeType.FunctionalOptionParameter },
  { dirName: OnecDirName.CommonCommands, nodeType: OnecNodeType.CommonCommand },
  { dirName: OnecDirName.CommonAttributes, nodeType: OnecNodeType.CommonAttribute },
  { dirName: OnecDirName.SettingsStorages, nodeType: OnecNodeType.SettingsStorage },
  { dirName: OnecDirName.StyleItems, nodeType: OnecNodeType.StyleItem },
  { dirName: OnecDirName.CommandGroups, nodeType: OnecNodeType.CommandGroup },
  { dirName: OnecDirName.ScheduledJobs, nodeType: OnecNodeType.ScheduledJob },
  { dirName: OnecDirName.SessionParameters, nodeType: OnecNodeType.SessionParameter },
  { dirName: OnecDirName.XDTOPackages, nodeType: OnecNodeType.XDTOPackage },
]
