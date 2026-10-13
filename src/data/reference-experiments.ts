import type { Experiment } from './portal';

const pandas = 'Python 3.x\nPandas\nJupyter Notebook / Google Colab / Python IDE';
const plotting = `${pandas}\nMatplotlib\nSeaborn`;

function referenceExperiment(
  sourceDocument: string,
  details: Omit<Experiment, 'status' | 'date' | 'demo' | 'sourceDocument'>,
): Experiment {
  return {
    ...details,
    date: '',
    status: 'In progress',
    sourceDocument,
    demo: false,
  };
}

export const referenceExperiments: Experiment[] = [
  referenceExperiment('DS_Program4.docx', {
    id: 'program-4a-hierarchical-indexing', number: '4a',
    title: 'Hierarchical Indexing with Pandas',
    objective: 'Create a Pandas Series with hierarchical (multi-level) indexing using a list of lists and select subsets using partial indexing at the outer and inner levels.',
    description: 'Build a MultiIndex from department and branch values, then select records at each level.',
    requirements: pandas,
    procedure: 'Create the two-level index, attach it to a Series of marks, then select the Engineering department, the Engineering/CSE record, and the Science department.',
    code: `import pandas as pd

# Create a list of lists for hierarchical index
index = [
    ['Engineering', 'Engineering', 'Science', 'Science'],
    ['CSE', 'ECE', 'Physics', 'Chemistry']
]

# Create MultiIndex
multi_index = pd.MultiIndex.from_arrays(
    index,
    names=['Department', 'Branch']
)

# Create a Series using the hierarchical index
marks = pd.Series(
    [85, 78, 92, 88],
    index=multi_index
)

print("Original Series:")
print(marks)

# Partial indexing at the outer level
print("\\nData for Engineering:")
print(marks.loc['Engineering'])

# Partial indexing at the inner level
print("\\nData for CSE:")
print(marks.loc[('Engineering', 'CSE')])

# Selecting a subset using both levels
print("\\nData for Science:")
print(marks.loc['Science'])`,
    output: 'Engineering: CSE 85, ECE 78.\nEngineering/CSE: 85.\nScience: Physics 92, Chemistry 88.',
    remarks: 'The document explains that MultiIndex.from_arrays creates Department and Branch levels, and .loc selects outer- and inner-level records.',
    language: 'python',
  }),
  referenceExperiment('DS_Program4.docx', {
    id: 'program-4b-stack-unstack', number: '4b',
    title: 'Rearrange Data with Stack and Unstack',
    objective: 'Rearrange tabular data with hierarchical indexing using the Pandas unstack() and stack() methods.',
    description: 'Move the Branch index level to columns and then restore the hierarchical row index.',
    requirements: pandas,
    procedure: 'Create tabular data indexed by Department and Branch. Unstack the inner level into columns, then stack the data back.',
    code: `import pandas as pd

# Create hierarchical index
index = pd.MultiIndex.from_tuples(
    [
        ('Engineering', 'CSE'),
        ('Engineering', 'ECE'),
        ('Science', 'Physics'),
        ('Science', 'Chemistry')
    ],
    names=['Department', 'Branch']
)

# Create tabular data
data = pd.DataFrame(
    {
        '2025': [85, 78, 92, 88],
        '2026': [90, 82, 95, 91]
    },
    index=index
)

print("Original Tabular Data:")
print(data)

# Unstack the inner level
unstacked_data = data.unstack()

print("\\nData after Unstack():")
print(unstacked_data)

# Stack the data back
stacked_data = unstacked_data.stack()

print("\\nData after Stack():")
print(stacked_data)`,
    output: 'Original rows are grouped by Department and Branch. unstack() moves Branch into columns; stack() restores the hierarchical row index.',
    remarks: 'The source describes unstack() as converting a row index level into columns and stack() as converting columns back into a hierarchical row index.',
    language: 'python',
  }),
  referenceExperiment('DS_Program4.docx', {
    id: 'program-4c-merge-combine-first', number: '4c',
    title: 'Merge and Combine DataFrames',
    objective: 'Create two Pandas DataFrames, merge them using the index as the merge key, and fill missing values with combine_first().',
    description: 'Compare an outer index-based merge with combine_first() on overlapping student records.',
    requirements: pandas,
    procedure: 'Create two DataFrames with overlapping indices, merge on both indices using an outer join, and combine missing values from the second DataFrame.',
    code: `import pandas as pd

# Create the first DataFrame
df1 = pd.DataFrame(
    {
        'Name': ['Ravi', 'Sita', 'Arun'],
        'Marks': [85, None, 78],
        'Grade': ['A', 'B', None]
    },
    index=[101, 102, 103]
)

# Create the second DataFrame
df2 = pd.DataFrame(
    {
        'Name': ['Ravi', 'Sita', 'Kiran'],
        'Marks': [90, 88, 82],
        'Grade': [None, 'A', 'B']
    },
    index=[101, 102, 104]
)

print("First DataFrame:")
print(df1)
print("\\nSecond DataFrame:")
print(df2)

# Merge DataFrames using index as merge key
merged = pd.merge(
    df1,
    df2,
    left_index=True,
    right_index=True,
    how='outer',
    suffixes=('_DF1', '_DF2')
)
print("\\nMerged DataFrame:")
print(merged)

# Combine data using combine_first()
combined = df1.combine_first(df2)
print("\\nDataFrame after combine_first():")
print(combined)`,
    output: 'The outer merge retains indices 101, 102, 103, and 104. combine_first() fills Sita’s missing marks with 88 and includes Kiran at index 104.',
    remarks: 'Values present in df1 take precedence; missing values are filled from df2. The outer merge keeps index values from both DataFrames.',
    language: 'python',
  }),
  referenceExperiment('DS_Program5.docx', {
    id: 'program-5-iris-visualization', number: '5',
    title: 'Iris Dataset Visualization',
    objective: 'Load the online Iris dataset, process it with Pandas, and create line, scatter, histogram, box, and pair plots with Matplotlib and Seaborn.',
    description: 'An overview program using the online Iris dataset to explore feature distributions and relationships.',
    requirements: plotting,
    procedure: 'Read the Iris CSV dataset, inspect its first rows and statistical summary, then create the documented visualizations.',
    code: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load online dataset
url = "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv"
df = pd.read_csv(url)

# Display first five records
print("First Five Records:")
print(df.head())

# Display dataset information
print("\\nDataset Information:")
print(df.info())

# Display statistical summary
print("\\nStatistical Summary:")
print(df.describe())

# 1. Matplotlib - Line Plot
plt.figure(figsize=(8, 5))
plt.plot(df.index, df["sepal_length"], label="Sepal Length")
plt.plot(df.index, df["petal_length"], label="Petal Length")
plt.xlabel("Sample Index")
plt.ylabel("Length")
plt.title("Sepal Length and Petal Length")
plt.legend()
plt.grid()
plt.show()

# 2. Seaborn - Scatter Plot
plt.figure(figsize=(8, 5))
sns.scatterplot(data=df, x="sepal_length", y="petal_length", hue="species")
plt.title("Sepal Length vs Petal Length")
plt.xlabel("Sepal Length")
plt.ylabel("Petal Length")
plt.show()

# 3. Seaborn - Histogram
plt.figure(figsize=(8, 5))
sns.histplot(data=df, x="sepal_length", hue="species", kde=True)
plt.title("Distribution of Sepal Length")
plt.xlabel("Sepal Length")
plt.ylabel("Frequency")
plt.show()

# 4. Seaborn - Box Plot
plt.figure(figsize=(8, 5))
sns.boxplot(data=df, x="species", y="petal_length")
plt.title("Petal Length by Species")
plt.xlabel("Species")
plt.ylabel("Petal Length")
plt.show()

# 5. Seaborn - Pair Plot
sns.pairplot(df, hue="species")
plt.show()`,
    output: 'Prints the dataset preview, dataset information, and statistical summary. Displays a line plot, species-colored scatter plot, histogram with KDE, box plot, and pair plot.',
    remarks: 'The document states that the Iris dataset was loaded and processed, and the visualizations were created to examine distributions, relationships, and differences among variables.',
    language: 'python',
  }),
  referenceExperiment('DS_Program5.docx', {
    id: 'program-5a-line-plot-annotations', number: '5a',
    title: 'Line Plot with Ticks and Annotations',
    objective: 'Create a line plot with a title, axis labels, ticks, tick labels, annotations, and multiple subplots, then save the plot to a file.',
    description: 'Compare monthly sales and expenses in annotated Matplotlib subplots.',
    requirements: `${pandas}\nMatplotlib`,
    procedure: 'Plot monthly sales and expenses in two subplots, set titles and axis labels, customize ticks and tick labels, annotate the highest values, and save the figure.',
    code: `import matplotlib.pyplot as plt

# Data
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
sales = [120, 150, 180, 160, 220, 250]
expenses = [80, 100, 120, 110, 140, 160]

# Create subplots
fig, ax = plt.subplots(2, 1, figsize=(10, 8))

# Subplot 1: Sales
ax[0].plot(months, sales, marker="o", linewidth=2, label="Sales")
ax[0].set_title("Monthly Sales")
ax[0].set_xlabel("Month")
ax[0].set_ylabel("Sales")
ax[0].set_xticks(range(len(months)))
ax[0].set_xticklabels(months)
ax[0].annotate("Highest Sales", xy=(5, 250), xytext=(3.5, 270), arrowprops=dict(arrowstyle="->"))
ax[0].legend()
ax[0].grid(True)

# Subplot 2: Expenses
ax[1].plot(months, expenses, marker="s", linewidth=2, label="Expenses")
ax[1].set_title("Monthly Expenses")
ax[1].set_xlabel("Month")
ax[1].set_ylabel("Expenses")
ax[1].set_xticks(range(len(months)))
ax[1].set_xticklabels(months)
ax[1].annotate("Highest Expense", xy=(5, 160), xytext=(3.5, 180), arrowprops=dict(arrowstyle="->"))
ax[1].legend()
ax[1].grid(True)

fig.suptitle("Monthly Sales and Expenses Analysis", fontsize=16)
plt.tight_layout()
plt.savefig("monthly_sales_expenses.png", dpi=300, bbox_inches="tight")
plt.show()`,
    output: 'Displays Monthly Sales and Monthly Expenses subplots with legends, grids, customized month ticks, and annotations. Saves the figure as monthly_sales_expenses.png at 300 DPI.',
    remarks: 'The source describes two subplots with titles, axis labels, customized ticks, legends, grids, and arrow annotations.',
    language: 'python',
  }),
  referenceExperiment('DS_Program5.docx', {
    id: 'program-5b-i-grouped-bars', number: '5b.i',
    title: 'Grouped Bar Plot from a DataFrame',
    objective: 'Create grouped bar plots from a DataFrame so each row’s values appear side by side.',
    description: 'Compare Python, Java, and C++ marks for each student using the DataFrame index.',
    requirements: `${pandas}\nMatplotlib`,
    procedure: 'Create a DataFrame indexed by student names and plot its columns as grouped bars.',
    code: `import pandas as pd
import matplotlib.pyplot as plt

data = {
    'Python': [85, 90, 78, 88],
    'Java': [75, 82, 80, 85],
    'C++': [80, 76, 85, 90]
}

df = pd.DataFrame(data, index=['Student1', 'Student2', 'Student3', 'Student4'])
print("DataFrame:")
print(df)

df.plot(kind='bar', figsize=(8, 5))
plt.title("Student Marks in Different Programming Languages")
plt.xlabel("Students")
plt.ylabel("Marks")
plt.xticks(rotation=0)
plt.legend(title="Subjects")
plt.tight_layout()
plt.show()`,
    output: 'Prints the four-row marks DataFrame and displays three side-by-side bars for each student: Python, Java, and C++.',
    remarks: 'Each DataFrame row is represented as a group of bars.',
    language: 'python',
  }),
  referenceExperiment('DS_Program5.docx', {
    id: 'program-5b-ii-stacked-bars', number: '5b.ii',
    title: 'Stacked Bar Plot from a DataFrame',
    objective: 'Create a stacked bar plot from a DataFrame, stacking the values of different columns for each index value.',
    description: 'Show each student’s Python, Java, and C++ marks in one stacked bar.',
    requirements: `${pandas}\nMatplotlib`,
    procedure: 'Create the student marks DataFrame and plot it with stacked=True.',
    code: `import pandas as pd
import matplotlib.pyplot as plt

data = {
    'Python': [85, 90, 78, 88],
    'Java': [75, 82, 80, 85],
    'C++': [80, 76, 85, 90]
}

df = pd.DataFrame(data, index=['Student1', 'Student2', 'Student3', 'Student4'])
print("DataFrame:")
print(df)

df.plot(kind='bar', stacked=True, figsize=(8, 5))
plt.title("Stacked Bar Plot of Student Marks")
plt.xlabel("Students")
plt.ylabel("Total Marks")
plt.xticks(rotation=0)
plt.legend(title="Subjects")
plt.tight_layout()
plt.show()`,
    output: 'Prints the student marks DataFrame and displays one stacked bar for each student.',
    remarks: 'The source notes that grouped bars compare individual values, while stacked bars show each index’s total and contribution.',
    language: 'python',
  }),
  referenceExperiment('DS_Program5.docx', {
    id: 'program-5c-histogram-density', number: '5c',
    title: 'Histogram and Density Plot',
    objective: 'Create a histogram to display value frequency and a density plot to generate a continuous probability distribution estimate.',
    description: 'Visualize the distribution of the supplied observed marks using six histogram bins and a KDE curve.',
    requirements: plotting,
    procedure: 'Place the observed marks in a DataFrame, draw the histogram, and create a filled density plot.',
    code: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

data = [45, 50, 52, 55, 58, 60, 62, 65, 68, 70,
        72, 75, 78, 80, 82, 85, 88, 90, 92, 95]
df = pd.DataFrame({'Marks': data})

print("Observed Data:")
print(df)

plt.figure(figsize=(8, 5))
sns.histplot(df['Marks'], bins=6, kde=False)
plt.title("Histogram of Marks")
plt.xlabel("Marks")
plt.ylabel("Frequency")
plt.tight_layout()
plt.show()

plt.figure(figsize=(8, 5))
sns.kdeplot(df['Marks'], fill=True)
plt.title("Density Plot of Marks")
plt.xlabel("Marks")
plt.ylabel("Density")
plt.tight_layout()
plt.show()`,
    output: 'Prints the 20 observed marks, then displays a six-bin histogram and a filled density plot.',
    remarks: 'The source explains that the histogram shows frequencies across intervals and the KDE curve estimates the continuous probability distribution.',
    language: 'python',
  }),
  referenceExperiment('DS_Program5.docx', {
    id: 'program-5d-scatter-correlation', number: '5d',
    title: 'Scatter Plot and Correlation',
    objective: 'Create a scatter plot from two one-dimensional data series and examine their relationship using a correlation coefficient.',
    description: 'Plot study hours against marks and calculate their correlation.',
    requirements: `${pandas}\nMatplotlib`,
    procedure: 'Create the study-hours and marks series, draw the scatter plot, and calculate the Pearson correlation with Series.corr().',
    code: `import pandas as pd
import matplotlib.pyplot as plt

study_hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
marks = [45, 50, 55, 60, 65, 70, 72, 80, 85, 90]

df = pd.DataFrame({
    'Study_Hours': study_hours,
    'Marks': marks
})

print("Data:")
print(df)

plt.figure(figsize=(8, 5))
plt.scatter(df['Study_Hours'], df['Marks'])
plt.title("Relationship Between Study Hours and Marks")
plt.xlabel("Study Hours")
plt.ylabel("Marks")
plt.grid(True)
plt.tight_layout()
plt.show()

correlation = df['Study_Hours'].corr(df['Marks'])
print("\\nCorrelation Coefficient:", round(correlation, 2))`,
    output: 'Displays the data table and a scatter plot. Correlation Coefficient: 1.00.',
    remarks: 'The supplied document interprets the result as a strong positive linear relationship between study hours and marks.',
    language: 'python',
  }),
  referenceExperiment('DS_Program5.docx', {
    id: 'program-5e-box-plots', number: '5e',
    title: 'Box Plots by Department',
    objective: 'Create box plots to visualize the distribution of numerical data across multiple categorical variables.',
    description: 'Compare marks distributions for CSE, ECE, and EEE departments.',
    requirements: plotting,
    procedure: 'Create the Department and Marks columns, draw a Seaborn box plot, and label the axes.',
    code: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

data = {
    'Department': [
        'CSE', 'CSE', 'CSE', 'CSE', 'CSE',
        'ECE', 'ECE', 'ECE', 'ECE', 'ECE',
        'EEE', 'EEE', 'EEE', 'EEE', 'EEE'
    ],
    'Marks': [
        78, 85, 90, 72, 88,
        65, 70, 82, 75, 80,
        60, 68, 72, 76, 85
    ]
}

df = pd.DataFrame(data)
print("Data:")
print(df)

plt.figure(figsize=(8, 5))
sns.boxplot(x='Department', y='Marks', data=df)
plt.title("Marks Distribution by Department")
plt.xlabel("Department")
plt.ylabel("Marks")
plt.grid(axis='y', linestyle='--', alpha=0.5)
plt.tight_layout()
plt.show()`,
    output: 'Prints department and marks rows and displays one box for each category: CSE, ECE, and EEE.',
    remarks: 'The document identifies median, quartiles, IQR, whiskers, and outliers as the distribution features represented by a box plot.',
    language: 'python',
  }),
  referenceExperiment('DS_Program6.docx', {
    id: 'program-6a-time-series-datetime', number: '6a',
    title: 'Time Series with Datetime Index',
    objective: 'Create a Pandas time series using datetime objects and timestamps as the index.',
    description: 'Index five temperature observations with parsed daily timestamps.',
    requirements: pandas,
    procedure: 'Convert the date strings with pd.to_datetime(), then use the resulting timestamps as a Series index.',
    code: `import pandas as pd

dates = pd.to_datetime([
    '2026-01-01',
    '2026-01-02',
    '2026-01-03',
    '2026-01-04',
    '2026-01-05'
])

temperature = [28, 30, 29, 31, 32]
time_series = pd.Series(temperature, index=dates)

print("Time Series:")
print(time_series)`,
    output: 'A Series indexed by 2026-01-01 through 2026-01-05 with temperature values 28, 30, 29, 31, and 32.',
    remarks: 'The source notes that the index consists of timestamps and the corresponding values represent temperature observations.',
    language: 'python',
  }),
  referenceExperiment('DS_Program6.docx', {
    id: 'program-6b-date-range', number: '6b',
    title: 'Generate a DatetimeIndex',
    objective: 'Generate a DatetimeIndex of a specified length using pandas.date_range().',
    description: 'Create seven consecutive daily timestamps beginning January 1, 2026.',
    requirements: pandas,
    procedure: 'Set the start date, number of periods, and daily frequency in pd.date_range().',
    code: `import pandas as pd

date_index = pd.date_range(
    start='2026-01-01',
    periods=7,
    freq='D'
)

print("Generated DatetimeIndex:")
print(date_index)`,
    output: "DatetimeIndex with seven daily values from '2026-01-01' to '2026-01-07'.",
    remarks: 'The source describes start as the first date, periods as the number of timestamps, and freq=D as daily spacing.',
    language: 'python',
  }),
  referenceExperiment('DS_Program6.docx', {
    id: 'program-6c-time-zones', number: '6c',
    title: 'Time Zones and Timestamp Conversion',
    objective: 'Generate date ranges with time zones, localize timestamps, convert between time zones, and combine series from different zones.',
    description: 'Work with Asia/Kolkata and America/New_York time-series indexes.',
    requirements: pandas,
    procedure: 'Create timezone-aware and timezone-naive date ranges, localize the naive range, convert it to New York time, then concatenate series from both zones.',
    code: `import pandas as pd

# Generate a date range with a time zone
india_dates = pd.date_range(
    start='2026-01-01 09:00', periods=3, freq='h', tz='Asia/Kolkata'
)
print("1. Date Range with Asia/Kolkata Time Zone:")
print(india_dates)

# Create a timezone-naive DatetimeIndex
dates = pd.date_range(start='2026-01-01 09:00', periods=3, freq='h')
print("\\n2. Timezone-naive Date Range:")
print(dates)

# Localize the timezone
localized_dates = dates.tz_localize('Asia/Kolkata')
print("\\n3. After Localizing to Asia/Kolkata:")
print(localized_dates)

# Convert to another timezone
new_york_dates = localized_dates.tz_convert('America/New_York')
print("\\n4. Converted to America/New_York:")
print(new_york_dates)

# Create another time series in a different timezone
india_series = pd.Series([100, 200, 300], index=localized_dates)
new_york_series = pd.Series([400, 500, 600], index=new_york_dates)
print("\\n5. India Time Series:")
print(india_series)
print("\\nNew York Time Series:")
print(new_york_series)

# Combine two different timezone series
combined_series = pd.concat([india_series, new_york_series])
print("\\n6. Combined Time Series:")
print(combined_series)`,
    output: 'Prints date ranges in Asia/Kolkata and America/New_York, plus the two series and their concatenated time-series output.',
    remarks: 'The source demonstrates date-range creation, tz_localize(), tz_convert(), and combining the resulting series with pd.concat().',
    language: 'python',
  }),
  referenceExperiment('DS_Program6.docx', {
    id: 'program-6d-period-arithmetic', number: '6d',
    title: 'Period Arithmetic and Period Ranges',
    objective: 'Add and subtract integers from Pandas Period objects and construct ranges of periods with period_range().',
    description: 'Perform arithmetic on a monthly period and generate six consecutive months.',
    requirements: pandas,
    procedure: 'Create a monthly Period, add and subtract integer offsets, and create a six-period monthly range.',
    code: `import pandas as pd

p = pd.Period('2026-01', freq='M')
print("Original Period:")
print(p)

print("\\nAfter adding 2:")
print(p + 2)
print("\\nAfter adding 5:")
print(p + 5)
print("\\nAfter subtracting 1:")
print(p - 1)
print("\\nAfter subtracting 3:")
print(p - 3)

periods = pd.period_range(start='2026-01', periods=6, freq='M')
print("\\nRange of Periods:")
print(periods)`,
    output: '2026-01 + 2 = 2026-03; + 5 = 2026-06; - 1 = 2025-12; - 3 = 2025-10. The range contains January through June 2026.',
    remarks: 'The document uses monthly frequency (M) for both arithmetic and the period range.',
    language: 'python',
  }),
  referenceExperiment('DS_Program6.docx', {
    id: 'program-6e-asfreq-periods', number: '6e',
    title: 'Convert Period Frequency with asfreq',
    objective: 'Convert Pandas Period and PeriodIndex objects from one frequency to another with asfreq().',
    description: 'Convert monthly periods into daily periods at the beginning and end of each period.',
    requirements: pandas,
    procedure: 'Create a monthly Period and PeriodIndex, then call asfreq() with daily frequency and both start and end options.',
    code: `import pandas as pd

p = pd.Period('2026-01', freq='M')
print("Original Period:")
print(p)

daily_start = p.asfreq('D', how='start')
print("\\nMonthly Period converted to Daily (Start):")
print(daily_start)
daily_end = p.asfreq('D', how='end')
print("\\nMonthly Period converted to Daily (End):")
print(daily_end)

period_index = pd.period_range(start='2026-01', periods=3, freq='M')
print("\\nOriginal PeriodIndex:")
print(period_index)

daily_period_index = period_index.asfreq('D', how='start')
print("\\nPeriodIndex converted to Daily Frequency:")
print(daily_period_index)
daily_period_index_end = period_index.asfreq('D', how='end')
print("\\nPeriodIndex converted to Daily Frequency (End):")
print(daily_period_index_end)`,
    output: 'January 2026 converts to 2026-01-01 at the start and 2026-01-31 at the end. The three-month PeriodIndex converts to daily start and end dates.',
    remarks: 'The source describes how=start as the beginning of each period and how=end as the end.',
    language: 'python',
  }),
  referenceExperiment('DS_Program6.docx', {
    id: 'program-6f-to-period', number: '6f',
    title: 'Convert Timestamp Indexes to Periods',
    objective: 'Convert Series and DataFrame objects indexed by timestamps into Period and PeriodIndex objects using to_period().',
    description: 'Convert dated sales and profit observations to monthly frequency.',
    requirements: pandas,
    procedure: 'Create a timestamp-indexed Series and DataFrame, then convert each index to monthly periods.',
    code: `import pandas as pd

dates = pd.to_datetime([
    '2026-01-10', '2026-02-15', '2026-03-20', '2026-04-25'
])

sales = pd.Series([1000, 1500, 1800, 2200], index=dates)
print("Original Series:")
print(sales)

period_series = sales.to_period('M')
print("\\nSeries converted to Monthly Periods:")
print(period_series)

df = pd.DataFrame(
    {'Sales': [1000, 1500, 1800, 2200], 'Profit': [200, 300, 400, 500]},
    index=dates
)
print("\\nOriginal DataFrame:")
print(df)

period_df = df.to_period('M')
print("\\nDataFrame converted to Monthly Periods:")
print(period_df)`,
    output: 'Prints the original timestamp-indexed Series and DataFrame, followed by monthly versions indexed from 2026-01 through 2026-04.',
    remarks: 'The source lists daily, monthly, quarterly, and yearly frequency options; this example converts the timestamps to monthly periods.',
    language: 'python',
  }),
  referenceExperiment('DS_Program6.docx', {
    id: 'program-6g-resampling', number: '6g',
    title: 'Resampling, Downsampling, and Upsampling',
    objective: 'Perform resampling, downsampling, and upsampling operations on a Pandas time series.',
    description: 'Transform hourly observations into 3-hour means, 4-hour sums, and 30-minute intervals.',
    requirements: pandas,
    procedure: 'Create a 12-value hourly series. Calculate a 3-hour mean, a 4-hour sum, then upsample to 30-minute intervals with and without forward filling.',
    code: `import pandas as pd

dates = pd.date_range(start='2026-01-01 00:00', periods=12, freq='h')
values = [10, 12, 15, 14, 18, 20, 22, 21, 25, 28, 30, 32]
time_series = pd.Series(values, index=dates)

print("Original Hourly Time Series:")
print(time_series)

resampled = time_series.resample('3h').mean()
print("\\nResampled Time Series - 3 Hour Mean:")
print(resampled)

downsampled = time_series.resample('4h').sum()
print("\\nDownsampled Time Series - 4 Hour Sum:")
print(downsampled)

upsampled = time_series.resample('30min').asfreq()
print("\\nUpsampled Time Series - 30 Minute:")
print(upsampled)

upsampled_ffill = time_series.resample('30min').ffill()
print("\\nUpsampled Time Series using Forward Fill:")
print(upsampled_ffill)`,
    output: '3-hour means: 12.333333, 17.333333, 22.666667, 30.000000. 4-hour sums: 51, 81, 115. Upsampling creates 30-minute intervals; ffill() carries the previous hourly value forward.',
    remarks: 'The source explains that new 30-minute timestamps contain NaN without an observation and can be filled using forward fill.',
    language: 'python',
  }),
];