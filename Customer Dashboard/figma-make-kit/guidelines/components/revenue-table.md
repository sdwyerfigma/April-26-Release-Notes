# RevenueTable

## When to use

Use `RevenueTable` when the table is the core content of a revenue review or customer-portfolio screen.

## Columns

The default table structure is:

1. Customer
2. Owner
3. Segment
4. ARR
5. Growth
6. Expansion
7. Renewal
8. Health

Keep this order unless a user explicitly asks for a different schema.

## Visual rules

- Customer cell is the richest cell and includes avatar, title, subtitle, and activity note
- Numeric metrics align right
- Segment is shown as a small badge
- Health is shown as a status badge
- Growth uses color and directional icon

## Empty state

If filtering removes all rows, use the built-in empty state instead of a blank table.

## Common mistakes

- Do not turn every row into a large card
- Do not use multiline giant cells that destroy scanability
- Do not left-align numeric columns
