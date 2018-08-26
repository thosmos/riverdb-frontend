# List of queries of graphql.riverdb.computed

Getting all units & names:

```
{
  constituentlookup (Active:true) {
    Active
    AnalyteCode {
      AnalyteName
      AnalyteShort
    }
    MatrixCode {
      MatrixName
      MatrixShort
    }
    MethodCode {
      MethodName
    }
    UnitCode{
      Unit
    }
  }
}
```
